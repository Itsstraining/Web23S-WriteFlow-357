import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DocumentComponent } from './components/document/document.component';
import { ListComponent } from './components/list/list.component';
import { QuillModule } from 'ngx-quill';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';




@NgModule({
  declarations: [
    MainComponent,
    DocumentComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    QuillModule.forRoot(),
  ]
})
export class MainModule { }
