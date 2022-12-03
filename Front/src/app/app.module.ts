import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationModule } from './core/authentification/authentification.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthentificationModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      maxOpened: 3,
      tapToDismiss: false,
      closeButton: true,
      easeTime: 150,
      positionClass: 'toast-bottom-center'
    }),

    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      //enabled: environment.production,

      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
