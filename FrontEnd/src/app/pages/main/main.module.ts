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
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { EditNameComponent } from './components/document/components/edit-name/edit-name.component';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from '../role/role.component';
import { NotifyDialogComponent } from './components/notify-dialog/notify-dialog.component';


@NgModule({
  declarations: [
    MainComponent,
    DocumentComponent,
    ListComponent,
    MailComponent,
    RecycleComponent,
    CreateDocumentComponent,
    EditNameComponent,
    RoleComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule,
    QuillModule.forRoot(),
  ]
})
export class MainModule { }
