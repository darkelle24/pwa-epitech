import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { route } from './one-clothe.routing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OneClotheService } from './one-clothe.service';
import { OneClotheComponent } from './one-clothe.component';

@NgModule({
  declarations: [
    OneClotheComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(route),
  ],
  providers: [OneClotheService]
})
export class OneClotheModule { }
