import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
//import { RoleComponent } from './role.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    //RoleComponent
    
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule
  ]
})
export class RoleModule { }
