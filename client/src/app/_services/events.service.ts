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

  
  
  setMonthEmoticons(): {monthName: string, monthEmoticon: string} {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthEmoticons = [
      "❄️", "💖", "🌱", "🌷", "🌞", "🌴",
      "🌊", "🍉", "🍂", "🎃", "🍁", "🎄"
    ];

    const currentMonth = new Date().getMonth();
    const monthName = monthNames[currentMonth];
    const monthEmoticon = monthEmoticons[currentMonth];

    return {monthName, monthEmoticon};
  }

  generateDaysInMonth(): Day[] {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

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
