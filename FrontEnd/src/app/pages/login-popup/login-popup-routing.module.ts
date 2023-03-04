import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPopupComponent } from './login-popup.component';

const routes: Routes = [{ path: '', component: LoginPopupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPopupRoutingModule { }
