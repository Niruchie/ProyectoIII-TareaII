import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [NgIf,FormsModule],
  selector: 'app-register',
  standalone: true,
})
export class RegisterComponent {
  private service = inject(AuthenticationService);
  private router = inject(Router);

  onRegister(form: NgForm) {
    if (form.valid) {
      const user = form.value;
      this.service
        .create(user)
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: (error) => console.error(error),
        });
    }
  }
}
