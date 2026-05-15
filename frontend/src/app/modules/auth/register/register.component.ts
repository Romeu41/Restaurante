import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['garcom', Validators.required]
    });
  }

  successMessage = '';

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'Conta criada com sucesso! Redirecionando para o login...';
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: err => {
        this.errorMessage = err?.error?.message || 'Falha ao criar usuário';
        this.loading = false;
      }
    });
  }
}
