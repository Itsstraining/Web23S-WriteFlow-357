import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

//Angular Material
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  providers: [AuthService],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent
  ]
})

export class SharedModule { }
