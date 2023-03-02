import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './components/document/document.component';
import { MainComponent } from './main.component';

const routes: Routes = [{ path: '', component: MainComponent},
{ path: 'document', component: DocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
