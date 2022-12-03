import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasicLayoutComponent } from './basic-layout.component';
import { HeaderComponent } from './header/header.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationModule } from 'src/app/core/notification/notification.module';

@NgModule({
  declarations: [BasicLayoutComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    NotificationModule
  ],
  exports: [BasicLayoutComponent]
})
export class BasicLayoutModule { }
