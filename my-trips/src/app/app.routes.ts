import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./features/home/home.page').then(m => m.HomePage),
    },
    {
      path: 'auth/login',
      loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'auth/register',
      loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
      path: 'features/explore',
      loadComponent: () => import('./features/explore/trails.page/trails.page.component').then(m => m.TrailsPageComponent)
    }
    
  ];
  