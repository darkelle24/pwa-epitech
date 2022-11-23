import { EmptyLayoutComponent } from './empty-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [EmptyLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [EmptyLayoutComponent]
})
export class EmptyLayoutModule { }
