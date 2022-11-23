import { NgModule } from '@angular/core';
import { ExtraOptions, NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from 'src/app/core/authentification/guards/is-logged-in.guard';
import { IsNotLoggedInGuard } from 'src/app/core/authentification/guards/is-not-logged-in.guard';
import { LayoutComponent } from './layout/layout.component';

const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [
  { path: '', redirectTo: 'box', pathMatch: 'full' },

  {
    path: '',
    canActivate: [IsNotLoggedInGuard],
    canActivateChild: [IsNotLoggedInGuard],
    component: LayoutComponent,
    data: {
        layout: 'empty'
    },
    children: [
      {path: 'login', loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule) }
    ]
  },

  {
    path: '',
    canActivate: [IsLoggedInGuard],
    canActivateChild: [IsLoggedInGuard],
    component: LayoutComponent,
    data: {
      layout: 'basic'
    },
    children: [
      {path: 'box', children: [
        { path: '', loadChildren: () => import('./page/list-boitier/list-boitier.module').then(m => m.ListBoitierModule) },
        {
          path: ':boxId',
          data: {
            secondHeader: true
          },
          children: [
            {path: '', redirectTo: 'settings', pathMatch: 'full' },
            { path: 'schema',data: {fullScreen: true}, loadChildren: () => import('./page/litegraph/litegraph.module').then(m => m.LitegraphModule) },
            { path: 'settings', loadChildren: () => import('./page/box-settings/box-settings.module').then(m => m.BoxSettingsModule) },
            { path: 'metrics', loadChildren: () => import('./page/current-box-data/current-box-data.module').then(m => m.CurrentBoxDataModule) },
        ]}
      ]},
    ]
  },

  { path: '**', redirectTo: 'box', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
