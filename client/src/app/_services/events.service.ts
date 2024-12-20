import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
import { Event } from '../_models/event';
import { Day } from '../_models/day';
import { EventCategory } from '../_models/eventCategory';
import { EventParticipant } from '../_models/eventParticipant';
import { User } from '../_models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  //--
  daysInMonth: Day[] = [];

  createEvent(model: any) {
    return this.http.post<Event>(this.baseUrl + 'event/createEvent', model, this.getHttpOptions()).pipe(
      tap(response => {
        model.id = response.id;
        console.log(model.id);
      })
    );
  }

  getCategoriesFromDatabase() {
    return this.http.get<EventCategory[]>(this.baseUrl + 'event/getAllEventCategories', this.getHttpOptions());
  }

  getBackgroundColor(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return '#b387f5';
      case 2:
        return '#75c7f2';
      case 3:
        return '#eeeb6f';//eeeb6f
      case 4:
        return '#625c5c';
      case 5:
        return '#3eb83e';
      default:
        return '#eeeb6f';
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

  setMonthEmoticons(monthIndex: number): { monthName: string, monthEmoticon: string } {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthEmoticons = [
      "❄️", "💖", "🌱", "🌷", "🌞", "🌴",
      "🌊", "🍉", "🍂", "🎃", "🍁", "🎄"
    ];

    // Use the provided monthIndex to get the correct month name and emoticon
    const monthName = monthNames[monthIndex];
    const monthEmoticon = monthEmoticons[monthIndex];

    return { monthName, monthEmoticon };
  }

  generateDaysInMonth(monthIndex: number, monthYear: number): Day[] {
    const now = new Date();
    // const year = now.getFullYear();
    const year = monthYear;
    const month = monthIndex;

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

  joinEvent(eventId: number) {
    return this.http.post(this.baseUrl + 'event/joinEvent', { eventId }, this.getHttpOptions());
  }

  getEvents() {
    return this.http.get<Event[]>(this.baseUrl + 'event', this.getHttpOptions());
  }

  getEventById(id: number) {
    return this.http.get<{ id: number, name: string, start: Date, end: Date, location: string, creatorName: string, categoryId: number, currentUserId: string }>(this.baseUrl + 'event/' + id, this.getHttpOptions());
  }

  getEventsParticipantsForTheGivenEvent(id: number) {
    return this.http.get<User[]>(this.baseUrl + 'eventParticipant/' + id, this.getHttpOptions());
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`
      })
    }
  }
}
