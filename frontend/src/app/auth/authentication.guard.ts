import { inject, untracked } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../auth.service';

export const AuthenticationGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const authenticating = untracked(authService.authenticating);

    if (!authenticating) {
        const authenticated = untracked(authService.authenticated);
        return authenticated || router.createUrlTree([ '/login' ]);
    }

    return authService.authenticating$.pipe(
        filter(authenticating => !authenticating),
        map(() => {
            const authenticated = untracked(authService.authenticated);
            return authenticated || router.createUrlTree([ '/login' ]);
        })
    );
};
