import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm-delete',
  templateUrl: './comfirm-delete.component.html',
  styleUrls: ['./comfirm-delete.component.scss']
})
export class ComfirmDeleteComponent {
  tempConfirm={
    confirm: false
  }
  constructor(
    public dialogRef: MatDialogRef<ComfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  temp: any = {
    confirm: false
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.tempConfirm.confirm = true;
    this.dialogRef.close(this.tempConfirm);
  }
}
