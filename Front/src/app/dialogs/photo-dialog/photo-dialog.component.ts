import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, PhotoDialogService } from './photo-dialog.service';
import { ClotheInterface } from '../../models/box';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDialogComponent implements OnInit {

  /* Form = new FormGroup({
    name: new FormControl(this.data.clothe ? this.data.clothe.name : undefined, [Validators.required]),
    stock: new FormControl(this.data.clothe ? this.data.clothe.clotheAvaible : undefined , [Validators.required]),
    price: new FormControl(this.data.clothe ? this.data.clothe.unitPrice : undefined, [Validators.required]),
  }) */

  isLoading: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private service: PhotoDialogService, private mdDialogRef: MatDialogRef<PhotoDialogComponent>, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkPermissions()
  }

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.btnLabel = 'Re capture image'
  }

  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 300,
        height: 300
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage() {
    this.trigger.next();
  }

  proceed() {
    console.log(this.previewImage);
  }

  public cancel() {
    this.close();
  }

  public close(value: ClotheInterface | undefined = undefined) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  onSubmit() {
    this.isLoading = true
    this.changeDetectionRef.detectChanges();
    console.log(this.previewImage)
    this.service.saveImage(this.dataURItoBlob(this.previewImage), this.data.clothe.id).subscribe({
      next: (value) => {
        this.isLoading = false;
        console.log(value)
        //this.changeDetectionRef.detectChanges();
        //this.close(value)
      },
      error: (err) => {
        this.isLoading = false;
        this.changeDetectionRef.detectChanges();
      },
    })
    /* this.changeDetectionRef.detectChanges();
    this.service.saveClothe(
      this.Form.controls.name.value,
      this.Form.controls.stock.value,
      this.Form.controls.price.value,
      this.data.clothe ? this.data.clothe.id : undefined
    ).subscribe({
      next: (value) => {
        this.isLoading = false;
        //this.changeDetectionRef.detectChanges();
        if (this.data.clothe) {
          value.picture = this.data.clothe.picture
          value.fav = this.data.clothe.fav
        }
        this.close(value)
      },
      error: (err) => {
        this.isLoading = false;
        this.changeDetectionRef.detectChanges();
      },
    }) */
  }

}
