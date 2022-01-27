import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Redirect301Component } from './components/redirect301/redirect301.compoenent';

const routes: Routes = [
  { path: 'home',             redirectTo: '', pathMatch: 'full' },
  {
    path: '',
 
    data: {page: `home`},
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'dashboard',
 
    data: {page: `dashboard`},
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: '**',               component: Redirect301Component},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false, initialNavigation: 'enabled', preloadingStrategy: null, relativeLinkResolution: 'legacy', }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
