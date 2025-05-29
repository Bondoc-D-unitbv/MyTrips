import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  passwordValidator(control: any) {
    const value = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return pattern.test(value) ? null : { weakPassword: true };
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.http.post('https://683870c12c55e01d184d5142.mockapi.io/mytripsapi/Users', { email, password }).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          alert('Registration failed. Try different credentials.');
        }
      });
    }
  }

  goToLogin() {
  this.router.navigate(['/auth/login']);
  }

}
