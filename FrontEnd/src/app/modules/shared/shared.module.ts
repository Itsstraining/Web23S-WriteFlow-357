import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
//Angular Material
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { AuthService } from 'src/app/services/auth.service';
import { LoginpopupComponent } from 'src/app/components/loginpopup/loginpopup.component';
import { StatusComponent } from 'src/app/components/status/status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifyDialogComponent } from 'src/app/pages/main/components/notify-dialog/notify-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    LoginpopupComponent,
    StatusComponent,
    NotifyDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AngularMaterialModule,
    NavbarComponent,
    FooterComponent,
    NotifyDialogComponent,
    LoadingComponent,
    StatusComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})

export class SharedModule { }
