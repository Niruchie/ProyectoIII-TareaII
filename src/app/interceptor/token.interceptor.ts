import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  let headers = {};

  if (!authService.isAuthenticated())
    return next(req);

  headers = {
    setHeaders: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  }

  const clonedRequest = req.clone(headers);
  return next(clonedRequest);
};
