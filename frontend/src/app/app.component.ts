import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import packageJson from '../../package.json';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ RouterOutlet ],
    template: '<router-outlet/><div class="app-version">version {{ packageJson.version }}</div>',
    styles: [`
        .app-version { display: inline-block; position: fixed; right: 0.25rem; bottom: 0.25rem; }
    `]
})
export class AppComponent {
    protected readonly packageJson = packageJson;
}
