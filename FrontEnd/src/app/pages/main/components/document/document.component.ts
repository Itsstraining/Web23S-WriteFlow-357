import { Component, ViewChild } from '@angular/core';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  @ViewChild('quillEditor') editor: any;

  constructor() { }

  ngAfterViewInit(): void {
    let editor = this.editor.elementRef.nativeElement;
    let container = editor.getElementsByClassName('ql-container')[0];
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
}
