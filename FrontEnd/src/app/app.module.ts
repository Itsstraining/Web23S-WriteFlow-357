import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { DocumentReducer } from 'src/ngrx/reducers/document.reducer';
import { DocumentEffects } from 'src/ngrx/effects/document.effect';
import { RoleDialogComponent } from './components/role-dialog/role-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    RoleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    StoreModule.forRoot({doc:DocumentReducer}, {}),
    EffectsModule.forRoot([DocumentEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
