import { ListBoitierService } from './list-boitier.service';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { route } from './list-boitier.routing';

import { BoxComponent } from './box/box.component';
import { ListBoitierComponent } from './list-boitier.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DotModule } from 'src/app/components/dot/dot.module';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ListBoitierComponent,
    BoxComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    DotModule,
    HttpClientModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(route),
  ],
  providers: [ListBoitierService]
})
export class ListBoitierModule { }
