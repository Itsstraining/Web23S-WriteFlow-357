import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { EditBioComponent } from './components/edit-bio/edit-bio.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { EditAvatarComponent } from './components/edit-avatar/edit-avatar.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { EditBannerComponent } from './components/edit-banner/edit-banner.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditBioComponent,
    EditJobComponent,
    EditAvatarComponent,
    ViewImageComponent,
    EditBannerComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ImageCropperModule
  ]
})
export class ProfileModule { }
