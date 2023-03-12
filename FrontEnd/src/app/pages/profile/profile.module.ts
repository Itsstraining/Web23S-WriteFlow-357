import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

import { EditBioComponent } from './components/edit-bio/edit-bio.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditBioComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class ProfileModule { }
