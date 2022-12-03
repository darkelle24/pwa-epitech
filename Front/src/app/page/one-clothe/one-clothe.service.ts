import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap, shareReplay, Observable } from 'rxjs';
import { ClotheInterface } from 'src/app/models/box';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneClotheService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getOneClothe(id: string): Observable<ClotheInterface> {
    return this.http.get<ClotheInterface>(environment.apiUrl + '/clothes/' + id).pipe(
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
}
