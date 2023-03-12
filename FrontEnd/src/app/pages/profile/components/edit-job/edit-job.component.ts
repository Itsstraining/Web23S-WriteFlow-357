import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent {
  constructor(
    public dialogRef: MatDialogRef<EditJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  tempJob: any;

  ngOnInit() {
    this.tempJob = { job: structuredClone(this.data.job) };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addJob() {
    this.tempJob.job.push('');
  }

  removeJob(index: number) {
    this.tempJob.job.splice(index, 1);
  }
}
