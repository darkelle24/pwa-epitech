import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap, shareReplay } from 'rxjs';
import { BoxInterface } from 'src/app/models/box';
import { environment } from 'src/environments/environment';

@Injectable()
export class LitegraphService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getGraph(id: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/boxes/' + id + '/graph').pipe(
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

  setGraph(id: string, graph: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/boxes/' + id + '/graph', graph).pipe(
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
}
