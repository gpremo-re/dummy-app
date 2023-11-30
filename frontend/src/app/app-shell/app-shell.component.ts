import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [ RouterOutlet, RouterLink, MatButtonModule ],
    template: `
        <header>
            <button mat-flat-button color="primary" routerLink="/logout">Logout</button>
        </header>
        <router-outlet/>
    `,
    styles: [`
        header { padding: 1rem; text-align: right; background-color: darkgray }
    `],
})
export class AppShellComponent {
    // constructor(router: Router) {
    //     router.events.pipe(takeUntilDestroyed()).subscribe(console.log);
    // }
}
