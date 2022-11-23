import { Injectable, isDevMode } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, shareReplay, take, tap } from 'rxjs';
import { PortDialogComponent } from './port-dialog.component';
import { PortInterface, SensorInterface, TriggerInterface, BoxInterface } from 'src/app/models/box';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

export interface PortDialogData {
  port: PortInterface,
  idBox: string
}

export interface DeviceList {
  triggers: TriggerInterface[],
  sensors: SensorInterface[]
}

@Injectable()

export class PortDialogService {

  constructor(private dialog: MatDialog, private http: HttpClient, private toastr: ToastrService) { }

  dialogRef: MatDialogRef<PortDialogComponent, (PortInterface | undefined)>;

  public open(options: PortDialogData) {
    this.dialogRef = this.dialog.open(PortDialogComponent, {data: options, width: '400px'});
  }

  public confirmed(): Observable<(PortInterface | undefined)> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }

  getDevices(): Observable<DeviceList> {
    return this.http.get<DeviceList>(environment.apiUrl + '/boxes/devices').pipe(
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

  savePortConfig(id: string, portId:number , name: string, device: string, isActive: boolean = true): Observable<BoxInterface> {
    return this.http.put<BoxInterface>(environment.apiUrl + '/boxes/' + id, {ports: [{pin: portId, name, activated: isActive, deviceModel: device}]}).pipe(
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
