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

  getEventsForDay(date: Date): Event[] {
    return this.events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        date >= new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()) &&
        date <= new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate())
      );
    });
  }

  getBackgroundColor(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return '#b387f5';
      case 2:
        return '#75c7f2';
      case 3:
        return '#eeeb6f';//eeeb6f
      default:
        return '#625c5c';
    }
  }

  getFontColor(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return '#ffffff';
      case 2:
        return '#000000';
      case 3:
        return '#000000';//000000
      default:
        return '#ffffff';
    }
  }

  getBackgroundColorForDayOfWeek(monthName: string): string {
    switch (monthName) {
      case 'January':
        return '#69EAFF';
      case 'February':
        return '#ED4E41';
      case 'March':
        return '#E16D2D';
      case 'April':
        return '#F495BF';
      case 'May':
        return '#FCE100';
      case 'June':
        return '#8ABB18';
      case 'July':
        return '#00BCF2';
      case 'August':
        return '#BAD80A';
      case 'September':
        return '#FFB900';
      case 'October':
        return '#F7630C';
      case 'November':
        return '#D65134';
      case 'December':
        return '#13A10E';
      default:
        return '';
    }
  }
  
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
