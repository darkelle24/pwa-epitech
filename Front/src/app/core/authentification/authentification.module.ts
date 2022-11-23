import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthentificationInterceptor } from './authentification.interceptor';
import { AuthentificationService } from './authentification.service';

@NgModule({
  imports  : [
    HttpClientModule
],
providers: [
  AuthentificationService,
    {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthentificationInterceptor,
        multi   : true
    }
]
})
export class AuthentificationModule { }
