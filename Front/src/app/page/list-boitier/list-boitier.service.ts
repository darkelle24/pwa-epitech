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

  getlike(): Observable<ClotheInterface[]> {
    return this.http.get<ClotheInterface[]>(environment.apiUrl + '/users/me/like').pipe(
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

  dislike(id: string, name: string) {
    return this.http.put<any>(environment.apiUrl + '/users/me/dislike/' + id, {}).pipe(
      tap({
        next: res => {
          if (isDevMode()) {
            console.log(res)
          }
          this.toastr.success("Dislike clothe " + name)
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

  like(id: string, name: string) {
    return this.http.put<any>(environment.apiUrl + '/users/me/like/' + id, {}).pipe(
      tap({
        next: res => {
          if (isDevMode()) {
            console.log(res)
          }
          this.toastr.success("Like clothe " + name)
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

  addClothes(): Observable<ClotheInterface> {
    return this.http.post<ClotheInterface>(environment.apiUrl + '/clothes', {}).pipe(
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
