import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    template: `
        <div class="layout">
        <app-sidebar></app-sidebar>
        <div class="main">
        <app-header></app-header>
        <div class="content">
            <router-outlet></router-outlet>
        </div>
        </div>
    </div>
    `,
    styles: [`
        .layout {
            display: flex;
        height: 100vh;
    }
    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .content {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        background: #F0F3F7;
    }
    `]
})
export class MainLayoutComponent {}