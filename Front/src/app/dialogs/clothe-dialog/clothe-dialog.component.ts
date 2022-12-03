import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, ClotheDialogService } from './clothe-dialog.service';
import { ClotheInterface } from '../../models/box';

@Component({
  selector: 'app-clothe-dialog',
  templateUrl: './clothe-dialog.component.html',
  styleUrls: ['./clothe-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClotheDialogComponent implements OnInit {

  Form = new FormGroup({
    name: new FormControl(this.data.clothe ? this.data.clothe.name : undefined, [Validators.required]),
    stock: new FormControl(this.data.clothe ? this.data.clothe.clotheAvaible : undefined , [Validators.required]),
    price: new FormControl(this.data.clothe ? this.data.clothe.unitPrice : undefined, [Validators.required]),
  })

  isLoading: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private service: ClotheDialogService, private mdDialogRef: MatDialogRef<ClotheDialogComponent>, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
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

  onSubmit(result: any) {
    this.isLoading = true
    this.changeDetectionRef.detectChanges();
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
    })
  }

}
