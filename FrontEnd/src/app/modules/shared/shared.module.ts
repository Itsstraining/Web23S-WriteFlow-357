import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

//Angular Material
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,

  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})

export class SharedModule { }
