import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document/document.service';
import { concat, last, of, switchMap } from 'rxjs';
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
  document!: DocModel;
  showNotification = false;
  store$ = this.store.select('doc');
  users: Array<any> = [];
  isSocketConnected = false;
  saveInterval: any;

  constructor(
    private _socket: Socket,
    private activateRoute: ActivatedRoute,
    private documentService: DocumentService,
    private dialogService: MatDialog,
    private userService: UserService,
    private store: Store<{ doc: DocumentState }>,
    public authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data) => { this.roomId = data['id']; });
    this.handleSocketEvents(this.roomId);
    this.store.dispatch(DocumentActions.get({ id: this.roomId }))
    this.store$.subscribe((data) => {
      if (data.error.status === 500) {
        if(this.showNotification) return;
        this.showNotification = true;
        this.openShowNotification("You don't have permission to access this document");

      }
    })
    window.addEventListener('beforeunload', () => {
      this.beforeleave();
    });
  }
  openShowNotification(message:string) {
    this.dialogService.open(NotifyDialogComponent, {
      width: '500px',
      data:message
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

        this.users = data.users;
    })
    this._socket.emit('join-room', { roomId: this.roomId, user: user });
    this.watchDogListener().subscribe((data: any) => {
      //data return is document , if document uid !== current user uid or current user uid is not in canEdit and canView Array
      if (data.uid !== this.authService.currentUser?.uid && !data.canEdit.includes(this.authService.currentUser?.uid!) && !data.canView.includes(this.authService.currentUser?.uid!)) {
        if(this.showNotification) return;
        this.showNotification = true;
        this.openShowNotification("Your permission to access this document were removed ");
      } else { }
    })
  }

  async setup() {
    // Get document data
    this.documentService.getDoc(this.roomId).pipe(last()).subscribe((data: DocModel) => {
      this.document = data;
    });
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
    this.documentService.saveFile(this.editor.quillEditor.getContents(), this.document.contentPath);
  }

  processData() {
    concat(this.documentService.getFile(this.document.contentPath, this.roomId), this.listenForChanged()).subscribe((data: any) => {
      this.defaultData = data;
      this.editor.quillEditor.updateContents(data);
    })
    this.saveInterval = setInterval(() => {
      this._socket.emit('watch-dog', { docId: this.roomId })
      this.saveFile();
    },3000)
  }

  sendUpdateData(data: any) {
    this._socket.emit('send-data', { room: this.roomId, data: data });
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
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'], // remove formatting button
        ['link', 'image', 'video']
      ],
    },
  }

  async openEditNameDialog() {
    if (!this.document) return;
    let name = this.document.name;
    const dialogRef = this.dialogService.open(EditNameComponent, {
      width: '500px',
      data: name
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      this.document.name = result;
      this.store.dispatch(DocumentActions.update({ id: this.document.id, uid: this.authService.currentUser?.uid, updateField: 'name', updateValue: result }));
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

    clearInterval(this.saveInterval);
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
