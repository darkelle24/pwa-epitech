import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap, shareReplay, Observable } from 'rxjs';
import { ClotheInterface } from 'src/app/models/box';
import { environment } from 'src/environments/environment';

@Injectable()

export class ListBoitierService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getClothes(): Observable<ClotheInterface[]> {
    return this.http.get<ClotheInterface[]>(environment.apiUrl + '/clothes').pipe(
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

  addClothes(): Observable<ClotheInterface> {
    return this.http.post<ClotheInterface>(environment.apiUrl + '/clothes', {}).pipe(
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
