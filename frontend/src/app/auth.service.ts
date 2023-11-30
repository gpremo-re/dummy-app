import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, finalize, map, Observable, of, share, shareReplay } from 'rxjs';

@Injectable()
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly matSnackBar = inject(MatSnackBar);

    readonly #authenticating = signal(true);
    readonly authenticating = this.#authenticating.asReadonly();
    readonly authenticating$ = toObservable(this.#authenticating);

    readonly #principal = signal(null);
    readonly principal = this.#principal.asReadonly();

    readonly #sessionId = signal<string>(null);
    readonly sessionId = this.#sessionId.asReadonly();

    readonly authenticated = computed(() => this.#principal() !== null);

    constructor() {
        this.authenticate(null, true);
    }

    authenticate(credentials?: { username: string, password: string }, initial = false): Observable<any> {
        this.#authenticating.set(true);

        let headers = new HttpHeaders();

        if (credentials) {
            headers = new HttpHeaders()
                .append('authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password));
        }

        const authenticate$ = this.http.get('user', { headers })
            .pipe(
                finalize(() => this.#authenticating.set(false)),
                catchError(err => {
                    this.clear();

                    if (!initial) {
                        this.matSnackBar.open('There was a problem logging in');
                        console.log({ err });
                    }
                    return EMPTY;
                }),
                shareReplay()
            );

        authenticate$.subscribe(response => {
            if (response['name']) {
                this.#principal.set(response['principal']);
                this.#sessionId.set(response['details']['sessionId']);
            } else {
                this.clear();
            }
        });

        return authenticate$;
    }

    logout(): Observable<boolean> {
        const logout$ = this.http.post('logout', {})
            .pipe(
                map(() => true),
                catchError(() => of(true)),
                share()
            );

        logout$.subscribe(() => this.clear());

        return logout$;
    }

    private clear() {
        this.#principal.set(null);
        this.#sessionId.set(null);
    }
}
