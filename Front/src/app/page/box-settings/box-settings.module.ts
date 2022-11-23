import { PortDialogModule } from './../../dialogs/port-dialog/port-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxSettingsComponent } from './box-settings.component';

import { route } from './box-settings.routing';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PortComponent } from './port/port.component';
import { DotModule } from 'src/app/components/dot/dot.module';
import { HttpClientModule } from '@angular/common/http';
import { BoxSettingsService } from './box-settings.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    BoxSettingsComponent,
    PortComponent
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DotModule,
    MatIconModule,
    MatTooltipModule,
    PortDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    RouterModule.forChild(route),
  ],
  providers: [
    BoxSettingsService
  ]
})
export class BoxSettingsModule { }
