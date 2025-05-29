import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { InitialRedirectGuard } from './auth/initial-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    component: class DummyComponent {} 
  },
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'features/explore',
    loadComponent: () => import('./features/explore/trails.page/trails.page.component').then(m => m.TrailsPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];