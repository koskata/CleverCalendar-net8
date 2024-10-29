import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'events', component: EventListComponent},
    {path: '**', redirectTo: ''},
];
