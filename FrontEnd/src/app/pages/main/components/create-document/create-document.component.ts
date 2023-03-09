import { DialogRef } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DocModel } from 'src/app/models/doc.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { DocumentState } from 'src/ngrx/states/document.state';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent {
  @ViewChild('stepper') stepper!: MatStepper
  store$ = this.store.select('doc');
  inProgress = false;

  constructor(private _formBuilder: FormBuilder,
    private store: Store<{ doc: DocumentState }>,
    private authService: AuthService,
    private dialogRef: DialogRef<CreateDocumentComponent>) {
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  close() {
    if (this.inProgress == true) return;
    this.dialogRef.close();
  }
  createDoc() {
    if (this.firstFormGroup.value.firstCtrl?.trim() == '') return;
    this.inProgress = true;
    this.stepper.next();
    let timeNow = (Date.now()).toString()
    let doc: DocModel = {
      id: uuid.v4(),
      name: this.firstFormGroup.value.firstCtrl!,
      contentPath: '',
      isDelete: false,
      isPublic: false,
      dateCreated: timeNow,
      dateModified: timeNow,
      canEdit: [],
      canView: [],
      forkedFrom: '',
      stars: 0,
      uid: this.authService.currentUser?.uid!
    }
    let tempSub: Subscription = this.store$.subscribe((data) => {
      if (this.inProgress == true && data.inProcess == false) {
        if (data.error == '') {
          try {

            tempSub.unsubscribe();
            this.inProgress = false;
            this.stepper.next();
          } catch (err) { }
        } else {
          this.stepper.previous();
          this.inProgress = false;
        }
      } else {
        this.inProgress = data.inProcess;
      }
    })
    this.store.dispatch(DocumentActions.create({ document: doc }));
  }
}
