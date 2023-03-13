import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent {
  constructor(
    public dialogRef: MatDialogRef<EditAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  imageChangedEvent: any = '';
  originalImage: any = '';
  croppedImage: any = '';
  finalImage: any = '';
  invalidImage: boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  //cropper
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    if (!event.target.files[0]) return;
    this.originalImage = event.target.files[0];
  }

  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.finalImage = await this.convertToFile(this.croppedImage, this.originalImage.name, '');
  }

  loadImageFailed() {
    console.log('Load failed');
    this.invalidImage = true;
  }

  convertToFile(url: any, filename: any, mimeType: any) {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    filename = filename || 'file.' + (mimeType.split('/')[1] || 'png');
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

}
