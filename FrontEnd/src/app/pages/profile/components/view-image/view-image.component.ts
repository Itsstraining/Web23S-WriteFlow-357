import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
