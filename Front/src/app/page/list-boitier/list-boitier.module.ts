import { ListBoitierService } from './list-boitier.service';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { route } from './list-boitier.routing';

import { ListBoitierComponent } from './list-boitier.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClotheComponent } from './clothe/clothe.component';
import { AuthentificationModule } from 'src/app/core/authentification/authentification.module';
import { ClotheDialogModule } from 'src/app/dialogs/clothe-dialog/clothe-dialog.module';

@NgModule({
  declarations: [
    ListBoitierComponent,
    ClotheComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    AuthentificationModule,
    MatProgressSpinnerModule,
    ClotheDialogModule,
    RouterModule.forChild(route),
  ],
  providers: [ListBoitierService]
})
export class ListBoitierModule { }
