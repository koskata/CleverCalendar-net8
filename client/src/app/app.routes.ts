import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventLikedComponent } from './events/event-liked/event-liked.component';
import { EventScheduleComponent } from './events/event-schedule/event-schedule.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'events', component: EventListComponent, canActivate: [authGuard] },
            { path: 'events/liked', component: EventLikedComponent },
            { path: 'events/schedule', component: EventScheduleComponent },
        ]
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
