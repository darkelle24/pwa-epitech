import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PhotoDialogComponent } from './photo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthentificationModule } from 'src/app/core/authentification/authentification.module';
import { PhotoDialogService } from './photo-dialog.service';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    PhotoDialogComponent
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
    AuthentificationModule,
    WebcamModule
  ],
  exports: [PhotoDialogComponent],
  entryComponents: [PhotoDialogComponent],
  providers: [PhotoDialogService]
})
export class PhotoDialogModule { }
