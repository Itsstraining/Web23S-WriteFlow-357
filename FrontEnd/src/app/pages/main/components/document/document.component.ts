import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document/document.service';
import { concat, last, Observable, of, switchMap } from 'rxjs';
import { DocModel } from 'src/app/models/doc.model';
import { MatDialog } from '@angular/material/dialog';
import { DocumentState } from 'src/ngrx/states/document.state';
import { Store } from '@ngrx/store';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthService } from 'src/app/services/auth.service';
import { RoleDialogComponent } from 'src/app/pages/main/components/role-dialog/role-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { EditNameComponent } from './components/edit-name/edit-name.component';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, AfterViewInit {
  @ViewChild('quillEditor') editor!: QuillEditorComponent;

  previousContent!: any;
  defaultData: any;
  roomId!: string;
  roomData: any;
  initDocument = new Observable<any>;
  showNotification = false;
  store$ = this.store.select('doc');
  users: Array<UserModel> = [];
  isSocketConnected = false;
  saveInterval: any;
  currentDoc!: DocModel;
  canSave = false;

  //document storage
  storage = getStorage();
  storageDocument: any;

  constructor(
    private _socket: Socket,
    private activateRoute: ActivatedRoute,
    private documentService: DocumentService,
    private dialogService: MatDialog,
    private userService: UserService,
    private store: Store<{ doc: DocumentState }>,
    public authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data) => { this.roomId = data['id']; });
    this.handleSocketEvents(this.roomId);
    this.store.dispatch(DocumentActions.get({ id: this.roomId }))

    this.store$.subscribe((data) => {
      if (!data.document) return;
      this.currentDoc = data.document!;

      if (data.error.status === 500) {
        if (this.showNotification) return;
        this.showNotification = true;
        this.openShowNotification("You don't have permission to access this document");
        return;
      }

      if (this.currentDoc.uid && this.currentDoc.contentPath) {
        this.storageDocument = ref(this.storage, `${this.currentDoc.uid}/documents/${this.currentDoc.contentPath}`);
        getDownloadURL(this.storageDocument).then((url) => {
          this.initDocument = this.listenForFile(url);
        })
      }

    })

    window.addEventListener('beforeunload', () => {
      this.beforeleave();
    });
  }
  openShowNotification(message: string) {
    this.dialogService.open(NotifyDialogComponent, {
      width: '500px',
      data: message
    }).afterClosed().subscribe(() => {
      this.back();
    })

  }

  ngAfterViewInit(): void {
    this.setup();
  }

  ngOnDestroy(): void {
    this.beforeleave();
  }

  handleSocketEvents(params: any) {
    this.roomId = params;
    this._socket.on('connect', () => {
      this.handleSocketConnection();
    })

    this._socket.connect();
  }

  async handleSocketConnection() {
    if (this.isSocketConnected) return;
    console.log('connected');
    this.isSocketConnected = true;
    let user = await this.userService.getUser(this.authService.currentUser?.uid!)
    this.listenRoomChange().subscribe((data: any) => {
      if (data.users != null) {
        this.users = data.users;
      }

    })
    this._socket.emit('join-room', { roomId: this.roomId, user: user });
    this.watchDogListener().subscribe((data: any) => {
      //data return is document , if document uid !== current user uid or current user uid is not in canEdit and canView Array
      if (data.uid !== this.authService.currentUser?.uid && !data.canEdit.includes(this.authService.currentUser?.uid!) && !data.canView.includes(this.authService.currentUser?.uid!)) {
        if (this.showNotification) return;
        this.showNotification = true;
        this.openShowNotification("Your permission to access this document were removed ");
      } else { }
    })
  }

  async setup() {
    // Make sure  for quill to be fully loaded
    setTimeout(() => {
      const quill: Quill.Quill = this.editor.quillEditor;
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          this.sendUpdateData(delta);
        }
      });
      this.processData()
    }, 1000);
  }

  saveFile() {
    if (!this.canSave) return;
    uploadString(this.storageDocument, JSON.stringify(this.editor.quillEditor.getContents()), 'raw');
  }

  processData() {
    this.initDocument.subscribe((data: any) => {
      this.canSave = true;
      this.defaultData = data;
      this.editor.quillEditor.updateContents(data);
    })

    this.listenForChanged().subscribe((data: any) => {
      this.defaultData = data;
      this.editor.quillEditor.updateContents(data);
    })

    this.saveInterval = setInterval(() => {
      this._socket.emit('watch-dog', { docId: this.roomId })
      this.saveFile();
    }, 3000)

  }

  sendUpdateData(data: any) {
    this._socket.emit('send-data', { roomId: this.roomId, data: data });
  }

  listenForFile(url: string) {
    return this.httpClient.get(url, {
      responseType: 'json',
    });
  }

  listenForChanged() {
    return this._socket.fromEvent('receive-data')
  }

  listenRoomChange() {
    return this._socket.fromEvent('update-room')
  }

  //Quill editor config
  quillModule: QuillModule = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ header: 1 }, { header: 2 }, { list: 'ordered' }, { list: 'bullet' }], // custom button values
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [
          { 'size': ['small', false, 'large', 'huge'] },
          { 'header': [1, 2, 3, 4, 5, 6, false] },
          { 'font': [] }
        ],  // custom dropdown
        [{ 'align': [] }, 'clean', 'link', 'image'], // remove formatting button
      ],
    },
  }

  openEditNameDialog() {
    if (!this.currentDoc) return;

    let name = this.currentDoc.name;

    const dialogRef = this.dialogService.open(EditNameComponent, {
      width: '500px',
      data: name
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      this.store.dispatch(DocumentActions.update({ id: this.currentDoc.id, uid: this.authService.currentUser?.uid, updateField: 'name', updateValue: result }));
    });
  }

  openShareDialog() {
    let dialogRef = this.dialogService.open(RoleDialogComponent, {
      data: this.roomId
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this._socket.emit('watch-dog', { docId: this.roomId })
    });
  }

  back() {
    this.router.navigate(['/main']);
  }

  beforeleave() {
    this._socket.emit('leave-room', { roomId: this.roomId, user: this.authService.currentUser?.uid! });

    // clearInterval(this.saveInterval);
    this._socket.disconnect();
    this.saveFile()
  }

  //auto save
  @HostListener('window:beforeunload', ['$event'])
  async unloadHandler($event: any) {
    $event.preventDefault();
    this.beforeleave();
  }
  watchDogListener() {
    return this._socket.fromEvent('watch-dog-message')
  }
}
