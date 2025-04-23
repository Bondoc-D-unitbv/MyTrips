import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NzMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/auth/login']);
  }
  
}
