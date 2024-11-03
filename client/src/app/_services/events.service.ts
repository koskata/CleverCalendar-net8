import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
import { Event } from '../_models/event';
import { Day } from '../_models/day';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  events: Event[] = [];
  //--
  daysInMonth: Day[] = [];
  monthName: string = '';

  
  generateDaysInMonth(): Day[] {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    this.monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: firstDayOfWeek }, () => ({
      date: null
    }));

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push({ date: new Date(year, month, i) });
    }

    return this.daysInMonth;
  }

  getEvents() {
    return this.http.get<Event[]>(this.baseUrl + 'event', this.getHttpOptions());
  }

  getEvent(id: number) {
    return this.http.get<Event>(this.baseUrl + 'event/' + id, this.getHttpOptions());
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`
      })
    }
  }
}
