import { DialogRef } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { last, Subscription } from 'rxjs';
import { DocModel } from 'src/app/models/doc.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document/document.service';
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
    private dialogRef: DialogRef<CreateDocumentComponent>,
    private documentService: DocumentService) {
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  close() {
    if (this.inProgress == true) return;
    this.dialogRef.close();
  }

  async createDoc() {
    if (this.firstFormGroup.value.firstCtrl?.trim() == '') return;

    //Initiate the process
    this.inProgress = true;
    this.stepper.next();
    let timeNow = (Date.now()).toString()

    //Create an instance of DocModel
    let doc = this.createDocModel();
    let filePath: any = await this.documentService.createFile();

    Object.assign(doc, {
      contentPath: filePath.name,
      dateCreated: timeNow,
      dateModified: timeNow
    })

    console.log(doc);

    //Process data when store is updated
    let tempSub: Subscription = this.store$.subscribe((data) => {
      if (!this.inProgress || data.inProcess) {
        this.inProgress = data.inProcess;
        return;
      }

      if (data.error) {
        this.stepper.previous();
        this.inProgress = false;
        return;
      }

      try {
        tempSub.unsubscribe();
        this.inProgress = false;
        this.stepper.next();
      } catch (err) { }
    })


    this.store.dispatch(DocumentActions.create({ document: doc }));
  }


  createDocModel(): DocModel {
    let doc: DocModel = {
      id: uuid.v4(),
      name: this.firstFormGroup.value.firstCtrl!,
      contentPath: '',
      isDelete: false,
      isPublic: false,
      dateCreated: '0',
      dateModified: '0',
      canEdit: [],
      canView: [],
      forkedFrom: '',
      stars: 0,
      uid: this.authService.currentUser?.uid!
    }

    return doc;
  }
}
