import { Injectable, isDevMode } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, shareReplay, take, tap } from 'rxjs';
import { PhotoDialogComponent } from './photo-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ClotheInterface } from 'src/app/models/box';

export interface DialogData {
  clothe: ClotheInterface
}

@Injectable()

export class PhotoDialogService {

  constructor(private dialog: MatDialog, private http: HttpClient, private toastr: ToastrService) { }

  dialogRef: MatDialogRef<PhotoDialogComponent, (ClotheInterface | undefined)>;

  public open(options: DialogData) {
    this.dialogRef = this.dialog.open(PhotoDialogComponent, {data: options, width: '400px'});
  }

  public confirmed(): Observable<(ClotheInterface | undefined)> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }

  saveImage(file: string, id: string) {
    const formData = new FormData();
    formData.append('picture', file, "dab.jpeg")
    console.log('go')
    return this.http.put<any>(environment.apiUrl + '/clothes/' + id +'/picture', formData).pipe(
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

