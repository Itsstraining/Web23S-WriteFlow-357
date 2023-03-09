import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './components/document/document.component';
import { ListComponent } from './components/list/list.component';
import { MailComponent } from './components/mail/mail.component';
import { RecycleComponent } from './components/recycle/recycle.component';
import { MainComponent } from './main.component';

const routes: Routes = [{
  path: '', component: MainComponent,runGuardsAndResolvers:'always', children: [
    { path: 'documents/:type', component: ListComponent,
    runGuardsAndResolvers:'always',},

    { path: 'mail', component: MailComponent },
    { path: 'recycle', component: RecycleComponent },
  ]
},
{ path: 'document/edit', component: DocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
