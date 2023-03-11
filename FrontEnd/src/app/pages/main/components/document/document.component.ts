import { Component, HostListener, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  @ViewChild('quillEditor') editor!: QuillEditorComponent;

  previousContent!: any;
  roomId!: string;
  document!: DocModel;
  store$=this.store.select('doc');

  constructor(
    private _socket: Socket,
    private activateRoute: ActivatedRoute,
    private documentService: DocumentService,
    private dialogService:MatDialog,
    private store:Store<{doc:DocumentState}>,
    private authService:AuthService,

  ) {
    this.activateRoute.queryParams.subscribe((data)=>{

      this.handleSocketEvents(data['id']);
      this.store.dispatch(DocumentActions.get({id:data['id']}))
    });
  }

  ngOnInit(): void {
    this.store$.subscribe((data)=>{
      if(data.error){
        alert("You are not allowed to access this document");
      }
    })
  }

  ngAfterViewInit(): void {
    //let editor = this.editor.elementRef.nativeElement;
    //let container = editor.getElementsByClassName('ql-container')[0];

    this.setup();
  }

  handleSocketEvents = (params: any) => {
    this.roomId = params;

    this._socket.on('connect', () => {
      console.log("connected");
      this._socket.emit('join-room', this.roomId);
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
          this.documentService.saveFile(this.editor.quillEditor.getContents(), this.document.contentPath);
        }
      });

      this.processData()
    }, 1000);
  }

  processData() {
    concat(this.documentService.getFile(this.document.contentPath), this.listenForChanged()).subscribe((data: any) => {
      this.editor.quillEditor.updateContents(data);
    })
  }

  sendUpdateData(data: any) {
    this._socket.emit('send-data', { room: this.roomId, data: data });
  }

  listenForChanged() {
    return this._socket.fromEvent('receive-data')
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
  openShareDialog(){
    this.dialogService.open(RoleDialogComponent,{

    });

  }
  changeName(event:any){
    if(this.document.name===event.target.value) return;
    this.store.dispatch(DocumentActions.update({id:this.document.id,uid:this.authService.currentUser?.uid,updateField:'name',updateValue:event.target.value}));
  }

}
