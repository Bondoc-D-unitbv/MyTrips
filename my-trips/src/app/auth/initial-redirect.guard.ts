import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class InitialRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token') ||
                  sessionStorage.getItem('auth_token');
    if (token) {
      this.router.navigate(['/features/explore']);
    } else {
      this.router.navigate(['/auth/register']);
    }
    return false;
  }
}
