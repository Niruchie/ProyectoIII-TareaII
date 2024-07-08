import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const anyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  return authService.isAuthenticated() || true;
};
