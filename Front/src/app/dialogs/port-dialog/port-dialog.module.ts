import { ModelDeviceTypeFilterModule } from './../../core/pipes/model-device-type-filter/model-device-type-filter.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PortDialogComponent } from './port-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PortDialogService } from './port-dialog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PortDialogComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ModelDeviceTypeFilterModule
  ],
  exports: [PortDialogComponent],
  entryComponents: [PortDialogComponent],
  providers: [PortDialogService]
})
export class PortDialogModule { }
