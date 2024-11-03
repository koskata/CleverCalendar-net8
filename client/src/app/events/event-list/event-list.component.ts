interface Day {
  date: Date | null;
}

import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    this.loadEvents();
    this.generateDaysInMonth();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: events => this.events = events
    });
  }

  generateDaysInMonth() {
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
}
