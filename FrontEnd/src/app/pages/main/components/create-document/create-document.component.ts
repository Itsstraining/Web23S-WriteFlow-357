import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent {
  @ViewChild('stepper') stepper!:MatStepper
  constructor(private _formBuilder:FormBuilder){
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  ngAfterViewInit(): void {
  }

  close(){

  }
  createDoc(){

  }
}
