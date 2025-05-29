import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('auth_token') ||
                  sessionStorage.getItem('auth_token');
    if (token) {
       this.router.navigate(['/']);
      return false;
    }
    return true; 
  }
}
