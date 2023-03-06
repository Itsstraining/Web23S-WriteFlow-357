import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './components/document/document.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './main.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    { path: 'documents/:type', component: ListComponent }
  ]
},
{ path: 'document/edit', component: DocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
