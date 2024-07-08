import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import RoleEnum from '../../types/RoleEnum';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (authService.hasRole(RoleEnum.SUPER_ADMIN_ROLE)) {
    return true;
  }

  router.navigateByUrl('/unauthorized');
  return false;
};
