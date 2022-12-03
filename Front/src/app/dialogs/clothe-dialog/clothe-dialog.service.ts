import { Injectable, isDevMode } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, shareReplay, take, tap } from 'rxjs';
import { ClotheDialogComponent } from './clothe-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ClotheInterface } from 'src/app/models/box';

export interface DialogData {
  clothe?: ClotheInterface
}

@Injectable()

export class ClotheDialogService {

  constructor(private dialog: MatDialog, private http: HttpClient, private toastr: ToastrService) { }

  dialogRef: MatDialogRef<ClotheDialogComponent, (ClotheInterface | undefined)>;

  public open(options: DialogData) {
    this.dialogRef = this.dialog.open(ClotheDialogComponent, {data: options, width: '400px'});
  }

  public confirmed(): Observable<(ClotheInterface | undefined)> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }

  public saveClothe(name: string, stock: number, price: number, id?: string) {
    if (id) {
      return this.updateClothe(name, stock, price, id)
    } else {
      return this.createClothe(name, stock, price)
    }
  }

  private updateClothe(name: string, stock: number, price: number, id: string) {
    return this.http.put<ClotheInterface>(environment.apiUrl + '/clothes/' + id, {name: name, clotheAvaible: stock, unitPrice: price}).pipe(
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

  private createClothe(name: string, stock: number, price: number) {
    return this.http.post<ClotheInterface>(environment.apiUrl + '/clothes', {name: name, clotheAvaible: stock, unitPrice: price}).pipe(
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
