import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.scss']
})
export class EditBioComponent {
  constructor(
    public dialogRef: MatDialogRef<EditBioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  tempBio: any;

  ngOnInit() {
    this.tempBio = { bio: structuredClone(this.data.bio) };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
