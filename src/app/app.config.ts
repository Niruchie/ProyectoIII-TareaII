import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { tokenInterceptor } from './interceptor/token.interceptor';
import { apiInterceptor } from './interceptor/api.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        apiInterceptor,
        tokenInterceptor,
      ])
    )
  ],
};
