import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './notification.service';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
