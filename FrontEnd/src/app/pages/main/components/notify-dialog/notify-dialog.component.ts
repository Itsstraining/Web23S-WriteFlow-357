import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef:MatDialogRef<NotifyDialogComponent>) { }

    close() {
      this.dialogRef.close();
    }
}
