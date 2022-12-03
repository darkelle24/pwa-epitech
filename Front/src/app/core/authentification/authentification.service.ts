import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr';
import { shareReplay, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthentificationService {

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  register(email: string, username: string, password: string ) {
    return this.http.post<any>(environment.apiUrl + '/auth/register', { username: username, email: email, password }).pipe(
      map (res => {
        this.setSession(res);
        return res
      }),
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

  login(email: string, password: string ) {
    return this.http.post<any>(environment.apiUrl + '/auth/login', { username: email, password }).pipe(
      map (res => {
        this.setSession(res);
        return res
      }),
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

  public getMe() {
      return this.http.get<any>(environment.apiUrl + '/users/me').pipe(
        map (res => {
          localStorage.setItem(environment.projectName + '_info', JSON.stringify(res));
          return res
        }),
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

  private setSession(authResult) {
      //const expiresAt = dayjs().add(authResult.expiresIn,'second');
      localStorage.setItem(environment.projectName + '_info', JSON.stringify(authResult));
      localStorage.setItem(environment.projectName + '_jwt', authResult.token);
      //localStorage.setItem(environment.projectName + "_expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem(environment.projectName + "_jwt");
    localStorage.removeItem(environment.projectName + '_info');
      //localStorage.removeItem(environment.projectName + "_expires_at");
  }

  public isLoggedIn() {
    if (!environment.authRequired) {
      return true
    }
    /* if (localStorage.getItem(environment.projectName + "_jwt") && localStorage.getItem(environment.projectName + "_expires_at")) {
      return dayjs().isBefore(this.getExpiration());
    } else {
      return false
    } */
    if (localStorage.getItem(environment.projectName + "_jwt")) {
      return true;
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
