import { MatTooltipModule } from '@angular/material/tooltip';
import { DotComponent } from './dot.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [DotComponent],
  imports: [
    SharedModule,
    MatTooltipModule
  ],
  exports: [
    DotComponent
  ]
})
export class DotModule { }
