import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventLikedComponent } from './events/event-liked/event-liked.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { EventCreateModalComponent } from './events/event-create-modal/event-create-modal.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'events', component: EventListComponent, canActivate: [authGuard] },
            { path: 'events/liked', component: EventLikedComponent },
        ]
    },
    {path: 'errors', component: TestErrorComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
