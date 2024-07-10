import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../service/authentication.service';
import { ReportingService } from '../../../service/reporting.service';

@Component({
  imports: [LoginComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  selector: 'app-login',
  standalone: true,
})
export class LoginComponent {
  private service = inject(AuthenticationService);
  private reporter = inject(ReportingService);
  private router = inject(Router);

  @ViewChild("email")
  private email!: NgModel;

  @ViewChild("password")
  private password!: NgModel;

  onLogin(e: Event) {
    e.preventDefault();

    if (!this.email.valid) {
      this.email.control.markAsTouched();
      return void 0;
    }

    if (!this.password.valid) {
      this.password.control.markAsTouched();
      return void 0;
    }

    this.service
      .login({
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe({
        next: () => this.router.navigate(["/dashboard"]),
        error: (err) => this.reporter.error("Ha ocurrido un error. Verifica tus credenciales."),
      });
  }
}
