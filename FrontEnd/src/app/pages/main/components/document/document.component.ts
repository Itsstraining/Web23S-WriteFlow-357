import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/services/document/document.service';
import { concat, last, lastValueFrom } from 'rxjs';
import { DocModel } from 'src/app/models/doc.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RoleComponent } from 'src/app/pages/role/role.component';
import { DocumentState } from 'src/ngrx/states/document.state';
import { Store } from '@ngrx/store';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthService } from 'src/app/services/auth.service';
import { RoleDialogComponent } from 'src/app/components/role-dialog/role-dialog.component';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent  implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('quillEditor') editor!: QuillEditorComponent;

  previousContent!: any;
  defaultData: any;
  roomId!: string;
  roomData: any;
  document!: DocModel;
  store$ = this.store.select('doc');

  constructor(
    private _socket: Socket,
    private activateRoute: ActivatedRoute,
    private documentService: DocumentService,
    private dialogService: MatDialog,
    private userService:UserService,
    private store: Store<{ doc: DocumentState }>,
    private authService: AuthService,

  ) {
    console.log("aloha")
    this.activateRoute.queryParams.subscribe((data) => {
      this.roomId = data['id'];
    });

  }

  ngOnInit(): void {
    console.log("alo")
    this.handleSocketEvents(this.roomId);
    this.store.dispatch(DocumentActions.get({ id: this.roomId }))
    this.store$.subscribe((data) => {
      if (data.error.error.status===403) {
        alert("You don't have permission to access this document")
      }
    })

  }

  ngAfterViewInit(): void {
    this.setup();


  }
  ngOnDestroy(): void {


    this._socket.emit('leave-room', { roomId: this.roomId,user:this.authService.currentUser?.uid! });
    this._socket.disconnect();
     //unload component


  }

  handleSocketEvents = (params: any) => {
    this.roomId = params;

    this._socket.on('connect', async () => {
      console.log("connected");
       let user=await this.userService.getUser(this.authService.currentUser?.uid!)

       // get user in room
       this.listenRoomChange().subscribe((data)=>{
        console.log(data);
      })
      this._socket.emit('join-room',{roomId:this.roomId,user:user} );


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
          this.sendUpdateData(delta)
        }
      });
      this.processData()
      setInterval(() => {
        // this.documentService.saveFile(this.editor.quillEditor.getContents(), this.document.contentPath);
      }, 3000)
    }, 1000);
  }

  processData() {
    concat(this.documentService.getFile(this.document.contentPath,this.roomId), this.listenForChanged()).subscribe((data: any) => {
      this.defaultData = data;
      this.editor.quillEditor.updateContents(data);
    })
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
  openShareDialog() {
    this.dialogService.open(RoleDialogComponent, {

    });

  }
  changeName(event: any) {
    if (this.document.name === event.target.value) return;
    this.store.dispatch(DocumentActions.update({ id: this.document.id, uid: this.authService.currentUser?.uid, updateField: 'name', updateValue: event.target.value }));
  }
  back(){
    window.history.back();
  }

}
