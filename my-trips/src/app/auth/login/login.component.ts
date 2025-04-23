import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      rememberMe: [false]
    });
  }

  passwordValidator(control: any) {
    const value = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return pattern.test(value) ? null : { weakPassword: true };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.http.post('https://reqres.in/api/login', {
        email,
        password
      }).subscribe({
        next: (res: any) => {
          if (rememberMe) {
            localStorage.setItem('auth_token', res.token);
          }
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Login failed. Check credentials.');
        }
      });
    }
  }
}
