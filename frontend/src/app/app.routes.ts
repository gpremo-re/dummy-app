import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './auth/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: AppShellComponent,
        canActivate: [ AuthenticationGuard ],
        canDeactivate: [ () => inject(AuthService).logout() ],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            // { path: 'not-found-in-app', component: NotFoundComponent },
            // { path: '**', redirectTo: 'not-found-in-app' },
        ],
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', redirectTo: 'login' },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
