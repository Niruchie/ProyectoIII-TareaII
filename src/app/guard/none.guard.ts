import { AuthenticationService } from '../service/authentication.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const noneGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (!authService.isAuthenticated())
      return true;

  router.navigateByUrl('/dashboard');
  return false;
};
