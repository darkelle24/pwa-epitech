import { HttpClientModule } from '@angular/common/http';
import { LitegraphService } from './litegraph.service';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LitegraphComponent } from './litegraph.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

import { route } from './litegraph.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LitegraphComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(route),
  ],
  providers: [
    LitegraphService
  ]
})
export class LitegraphModule { }
