import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Greeting {
    id: string;
    content: string;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    greeting = signal<Greeting>(null);

    constructor(http: HttpClient) {
        http.get<Greeting>('resource')
            .subscribe(greeting => this.greeting.set(greeting));
    }
}
