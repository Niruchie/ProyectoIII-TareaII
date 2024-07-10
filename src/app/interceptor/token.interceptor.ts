import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthenticationService } from '../service/authentication.service';
import { Subject } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  let headers = {};

  if (!authService.isAuthenticated())
    return next(req);

  if (!authService.isExpiredSession()) {
    authService.logout();
    router.navigate(['/login']);
    // ! Cancel the request
    return new Subject();
  }


  headers = {
    setHeaders: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  }

  const clonedRequest = req.clone(headers);
  return next(clonedRequest);
};
