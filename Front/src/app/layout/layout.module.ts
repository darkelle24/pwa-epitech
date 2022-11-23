import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { LoadingComponent } from './loading/loading.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { BasicLayoutModule } from './basic-layout/basic-layout.module';
import { SharedModule } from '../shared/shared.module';
import { EmptyLayoutModule } from './empty-layout/empty-layout.module';


const layoutModules = [
  BasicLayoutModule,
  EmptyLayoutModule
];

@NgModule({
  declarations: [LayoutComponent, LoadingComponent],
  imports: [
    SharedModule,
    MatProgressBarModule,

    ...layoutModules
  ],
  exports: [
    LayoutComponent,

    ...layoutModules
  ]
})
export class LayoutModule { }
