import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({providedIn: 'root'})
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthentificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem(environment.projectName + "_jwt");

    if (idToken) {
        const cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + idToken).set("Bypass-Tunnel-Reminder", "")
        });
        return next.handle(cloned);
    }
    else {
        return next.handle(req);
    }
  }

  private gestError(error) {
    if ( error instanceof HttpErrorResponse && error.status === 401 ) {
      // Sign out
      this.authService.logout();

      // Reload the app
      location.reload();
    }

    return throwError(() => error);
  }
}
