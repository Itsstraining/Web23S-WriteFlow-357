import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DocumentComponent } from './components/document/document.component';
import { ListComponent } from './components/list/list.component';
import { QuillModule } from 'ngx-quill';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { MailComponent } from './components/mail/mail.component';
import { RecycleComponent } from './components/recycle/recycle.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';




@NgModule({
  declarations: [
    MainComponent,
    DocumentComponent,
    ListComponent,
    MailComponent,
    RecycleComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    SharedModule,
    QuillModule.forRoot(),
  ]
})
export class MainModule { }
