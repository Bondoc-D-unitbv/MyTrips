import { Routes } from '@angular/router';
import { InitialRedirectGuard } from './auth/initial-redirect.guard';
import { GuestOnlyGuard } from './auth/guard/guestOnly.guard';
import { AuthOnlyGuard } from './auth/guard/authOnly.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    component: class DummyComponent {} 
  },
  {
    path: 'auth/login',
    canActivate: [GuestOnlyGuard],
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    canActivate: [GuestOnlyGuard],
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'features/explore',
    canActivate: [AuthOnlyGuard],
    loadComponent: () => import('./features/explore/trails.page/trails.page.component').then(m => m.TrailsPageComponent)
  },
  {
    path: 'features/home',
    canActivate: [AuthOnlyGuard],
    loadComponent: () => import('./features/home/home.page').then(m => m.HomePage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];