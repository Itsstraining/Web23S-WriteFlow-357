import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DocumentComponent } from './components/document/document.component';
import { ListComponent } from './components/list/list.component';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    MainComponent,
    DocumentComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    QuillModule.forRoot(),
  ]
})
export class MainModule { }
