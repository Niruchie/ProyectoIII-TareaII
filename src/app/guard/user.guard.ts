import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (authService.isAuthenticated())
      return true;

  router.navigateByUrl('/login');
  return false;
};
