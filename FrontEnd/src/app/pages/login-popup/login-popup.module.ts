import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPopupRoutingModule } from './login-popup-routing.module';
import { LoginPopupComponent } from './login-popup.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPopupComponent
  ],
  imports: [
    CommonModule,
    LoginPopupRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginPopupModule { }
