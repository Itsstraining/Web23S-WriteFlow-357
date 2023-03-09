import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { RoleComponent } from 'src/app/pages/role/role.component';
//Angular Material
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import {MatMenuModule} from '@angular/material/menu';

import { AuthService } from 'src/app/services/auth.service';
import { LoginpopupComponent } from 'src/app/components/loginpopup/loginpopup.component';
import { StatusComponent } from 'src/app/components/status/status.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    LoginpopupComponent,
    StatusComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
   
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AngularMaterialModule,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    StatusComponent,
    ReactiveFormsModule,
    RoleComponent
  ]
})

export class SharedModule { }
