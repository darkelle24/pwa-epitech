import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthentificationService {

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  login(email: string, password: string ) {
    return this.http.post<any>(environment.apiUrl + '/auth/login', { username: email, password }).pipe(
      tap({
        next: res => {
          if (isDevMode()) {
            console.log(res)
          }
          this.setSession(res)
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.message)
        },
      }),
        shareReplay()
      )
  }

  private setSession(authResult) {
      const expiresAt = dayjs().add(authResult.expiresIn,'second');
      localStorage.setItem(environment.projectName + '_jwt', authResult.idToken);
      localStorage.setItem(environment.projectName + "_expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
      localStorage.removeItem(environment.projectName + "_jwt");
      localStorage.removeItem(environment.projectName + "_expires_at");
  }

  public isLoggedIn() {
    if (!environment.authRequired) {
      return true
    }
    if (localStorage.getItem(environment.projectName + "_jwt") && localStorage.getItem(environment.projectName + "_expires_at")) {
      return dayjs().isBefore(this.getExpiration());
    } else {
      return false
    }
  }

  isLoggedOut() {
    if (!environment.authRequired) {
      return true
    }
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem(environment.projectName + "_expires_at");
      const expiresAt = JSON.parse(expiration);
      return dayjs(expiresAt);
  }
}
