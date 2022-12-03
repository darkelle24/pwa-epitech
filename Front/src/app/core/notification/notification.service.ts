import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap, shareReplay } from 'rxjs';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private toastr: ToastrService, private swPush: SwPush, private AuthSevice: AuthentificationService) { }

  subNotification(sub: any): Observable<any> {
    console.log(JSON.parse(JSON.stringify(sub)))
    return this.http.put<any>(environment.apiUrl + '/users/me/subscribe', JSON.parse(JSON.stringify(sub))).pipe(
      tap({
        next: res => {
          if (isDevMode()) {
            console.log(res)
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error && err.error.message) {
            console.error(err)
            this.toastr.error(err.status + ' ' + err.statusText + ': ' + err.error.message)
            return
          }
          this.toastr.error(err.message)
        },
      }),
        shareReplay()
      )
  }

  subscribeToNotifications() {
    if (this.AuthSevice.isLoggedIn()) {
      /* this.swPush.requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY
      })
        .then(sub => this.subNotification(sub).subscribe())
        .catch(err => console.error("Could not subscribe to notifications", err)); */
    } else {
      console.log("No sub, Not logged")
    }
  }
}
