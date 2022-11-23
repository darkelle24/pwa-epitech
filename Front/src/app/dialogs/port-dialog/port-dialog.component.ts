import { Device1, Device2, Device3, SensorInterface, TriggerInterface } from './../../models/box';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PortDialogData, PortDialogService } from './port-dialog.service';
import { BoxInterface, PortInterface } from 'src/app/models/box';

@Component({
  selector: 'app-port-dialog',
  templateUrl: './port-dialog.component.html',
  styleUrls: ['./port-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortDialogComponent implements OnInit {

  Form = new FormGroup({
    name: new FormControl(this.data.port.name, [Validators.required]),
    type: new FormControl(this.data.port.device ? this.data.port.device.type : "sensor", [Validators.required]),
    model: new FormControl(this.data.port.device, [Validators.required]),
  })

  listModelDevice: (SensorInterface | TriggerInterface)[] = [Device1, Device2, Device3]

  isLoadingListModelDevice: boolean = true

  isLoading: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: PortDialogData, private service: PortDialogService, private mdDialogRef: MatDialogRef<PortDialogComponent>, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.getDevices().subscribe({
      next: (value) => {
        this.isLoadingListModelDevice = false;
        this.listModelDevice = value.sensors
        this.listModelDevice = this.listModelDevice.concat(value.triggers)
        this.changeDetectionRef.detectChanges();
      },
      error: (err) => {
        this.isLoadingListModelDevice = false;
        this.listModelDevice = []
        this.changeDetectionRef.detectChanges();
      },
    })
  }

  public cancel() {
    this.close();
  }

  public close(value: PortInterface | undefined = undefined) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }

  onSubmit(result: any) {
    this.isLoading = true
    this.changeDetectionRef.detectChanges();
    this.service.savePortConfig(
      this.data.idBox,
      this.data.port.pin,
      this.Form.controls.name.value,
      this.Form.controls.model.value.deviceModel
    ).subscribe({
      next: (value) => {
        this.isLoading = false;
        //this.changeDetectionRef.detectChanges();
        this.close(value.ports.find((value)=> value.pin === this.data.port.pin))
      },
      error: (err) => {
        this.isLoading = false;
        this.changeDetectionRef.detectChanges();
      },
    })
  }

}
