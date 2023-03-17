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
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent {
  @ViewChild('stepper') stepper!: MatStepper

  store$ = this.store.select('doc');
  inProgress = false;

  //document storage
  storage = getStorage();
  storageDocument: any;

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
    let filePath: string = uuid.v4();

    //Upload document to firebase storage
    this.storageDocument = ref(this.storage, `${this.authService.currentUser?.uid}/documents/${filePath}.json`);
    uploadString(this.storageDocument, JSON.stringify({}), 'raw')
      .then(() => {
        Object.assign(doc, {
          contentPath: filePath + '.json',
          dateCreated: timeNow,
          dateModified: timeNow
        })

        this.inProgress = false;
        this.stepper.next();
        this.store.dispatch(DocumentActions.create({ document: doc }));

        console.log(doc);

      })
      .catch((err) => {
        this.stepper.previous();
        this.inProgress = false;
      })
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
