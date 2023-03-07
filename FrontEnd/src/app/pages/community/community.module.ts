import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    CommunityComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MatIconModule
  ]
})
export class CommunityModule { }
