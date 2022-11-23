import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap, shareReplay } from 'rxjs';
import { BoxInterface } from 'src/app/models/box';
import { environment } from 'src/environments/environment';

@Injectable()
export class CurrentBoxDataService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getBoxe(id: string): Observable<BoxInterface> {
    return this.http.get<BoxInterface>(environment.apiUrl + '/boxes/' + id).pipe(
      tap({
        next: res => {
          if (isDevMode()) {
            console.log(res)
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.message)
        },
      }),
        shareReplay()
      )
  }

  saveBoxConfig(id: string, name: string, description?: string): Observable<BoxInterface> {
    return this.http.put<BoxInterface>(environment.apiUrl + '/boxes/' + id, {name, description}).pipe(
      tap({
        next: res => {
          if (isDevMode()) {
            console.log(res)
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.message)
        },
      }),
        shareReplay()
      )
  }
}
