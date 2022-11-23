import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap, shareReplay, Observable } from 'rxjs';
import { BoxInterface } from 'src/app/models/box';
import { environment } from 'src/environments/environment';

@Injectable()

export class ListBoitierService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getBoxes(): Observable<BoxInterface[]> {
    return this.http.get<BoxInterface[]>(environment.apiUrl + '/boxes').pipe(
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

  addBox(): Observable<BoxInterface> {
    return this.http.post<BoxInterface>(environment.apiUrl + '/boxes', {}).pipe(
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
