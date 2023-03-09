import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  @ViewChild('quillEditor') editor!: QuillEditorComponent;
  previousContent!: any;
  roomId!:string;

  constructor(private _socket:Socket,private activateRoute:ActivatedRoute) {


  }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params)=>{
      this.roomId=params['id'];
      this._socket.on('connect',()=>{
        console.log("connected");
        this._socket.emit('join-room',this.roomId);
      })
    })

  }

  ngAfterViewInit(): void {
    let editor = this.editor.elementRef.nativeElement;
    let container = editor.getElementsByClassName('ql-container')[0];
    // Make sure  for quill to be fully loaded
    setTimeout(() => {
      const quill: Quill.Quill = this.editor.quillEditor;
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          this.sendUpdateData(delta)
        }

      });
      this.listenForChanged().subscribe((data:any)=>{
        console.log(data);
        this.editor.quillEditor.updateContents(data);
        })
    }, 1000);

  }

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
  sendUpdateData(data:any){
    this._socket.emit('send-data',{room:this.roomId,data:data});
  }
  listenForChanged(){
    return this._socket.fromEvent('receive-data')
  }
}
