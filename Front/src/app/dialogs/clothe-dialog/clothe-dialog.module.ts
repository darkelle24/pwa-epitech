import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ClotheDialogComponent } from './clothe-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthentificationModule } from 'src/app/core/authentification/authentification.module';
import { ClotheDialogService } from './clothe-dialog.service';

@NgModule({
  declarations: [
    ClotheDialogComponent
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
    AuthentificationModule
  ],
  exports: [ClotheDialogComponent],
  entryComponents: [ClotheDialogComponent],
  providers: [ClotheDialogService]
})
export class ClotheDialogModule { }
