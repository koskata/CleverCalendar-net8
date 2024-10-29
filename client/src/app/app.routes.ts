import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './events/event-list/event-list.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'events', component: EventListComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'},
];
