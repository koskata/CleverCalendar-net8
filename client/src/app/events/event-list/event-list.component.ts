
import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { CommonModule } from '@angular/common';
import { Day } from '../../_models/day';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventsService);
  events: Event[] = [];
  daysInMonth: Day[] = [];
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthName: string = '';
  monthEmoticon: string = '';

  ngOnInit(): void {
    this.setMonthEmoticons();
    this.loadEvents();
    this.daysInMonth = this.eventService.generateDaysInMonth();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: events => this.events = events
    });
  }

  setMonthEmoticons() {
    const { monthName, monthEmoticon } = this.eventService.setMonthEmoticons();
    this.monthName = monthName;
    this.monthEmoticon = monthEmoticon;
  }

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

  
}
