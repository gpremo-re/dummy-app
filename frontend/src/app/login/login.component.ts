import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    readonly authService = inject(AuthService);
    readonly router = inject(Router);

    readonly usernameControl = new FormControl('user', Validators.required);
    readonly passwordControl = new FormControl('premo12321', Validators.required);

    readonly form = new FormGroup({
        username: this.usernameControl,
        password: this.passwordControl
    });

    login() {
        this.authService.authenticate(this.form.getRawValue())
            .subscribe(() => this.router.navigate([ '/home' ]));
    }
}
