import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

//Angular Material
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import {MatMenuModule} from '@angular/material/menu';

import { AuthService } from 'src/app/services/auth.service';
import { LoginpopupComponent } from 'src/app/components/loginpopup/loginpopup.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { RoleDialogComponent } from 'src/app/components/role-dialog/role-dialog.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    LoginpopupComponent,
    ConfirmDialogComponent,
    RoleDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatMenuModule
  ],
  providers: [AuthService],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    RoleDialogComponent
  ]
})

export class SharedModule { }
