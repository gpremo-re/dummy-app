import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, InjectionToken } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppInterceptor } from './app.interceptor';

import { routes } from './app.routes';
import { AuthService } from './auth.service';

const APP_VERSION = new InjectionToken("APP_VERSION")

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([ AppInterceptor ])),
        provideRouter(routes, withHashLocation()),
        provideAnimations(),
        AuthService,
        MatSnackBarModule,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', subscriptSizing: 'dynamic', hideRequiredMarker: true }
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            multi: true,
            deps: [
                AuthService,
            ]
        },
        {
            provide: APP_VERSION,
            useFactory: (http: HttpClient) => http.get("version")
        }
    ]
};
