import { HttpInterceptorFn } from '@angular/common/http';
import environment from '../../environment/env';


export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const host: string = environment.API_ENDPOINT;

  const modified = req.clone({
    url: host.concat(req.url),
    setHeaders: {
      Accept: 'application/json',
    },
  });

  return next(modified);
};
