import { HttpClientModule } from '@angular/common/http';
import { CurrentBoxDataComponent } from './current-box-data.component';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { route } from './current-box-data.routing';
import { OnePortComponent } from './one-port/one-port.component';
import { DotModule } from 'src/app/components/dot/dot.module';
import { CurrentBoxDataService } from './current-box-data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CurrentBoxDataComponent,
    OnePortComponent
  ],
  imports: [
    SharedModule,
    DotModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(route),
  ],
  providers: [
    CurrentBoxDataService
  ]
})
export class CurrentBoxDataModule { }
