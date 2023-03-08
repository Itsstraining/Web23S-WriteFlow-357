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
<<<<<<< HEAD
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { RoleDialogComponent } from 'src/app/components/role-dialog/role-dialog.component';
=======
import { StatusComponent } from 'src/app/components/status/status.component';
import { ReactiveFormsModule } from '@angular/forms';

>>>>>>> ad73d645cdd3c7cb61cff37d37b1272b1ca2ee39
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    LoginpopupComponent,
<<<<<<< HEAD
    ConfirmDialogComponent,
    RoleDialogComponent
=======
    StatusComponent,
>>>>>>> ad73d645cdd3c7cb61cff37d37b1272b1ca2ee39
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
<<<<<<< HEAD
    MatMenuModule
=======
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
>>>>>>> ad73d645cdd3c7cb61cff37d37b1272b1ca2ee39
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
<<<<<<< HEAD
    ConfirmDialogComponent,
    RoleDialogComponent
=======
    StatusComponent,
    ReactiveFormsModule,
>>>>>>> ad73d645cdd3c7cb61cff37d37b1272b1ca2ee39
  ]
})

export class SharedModule { }
