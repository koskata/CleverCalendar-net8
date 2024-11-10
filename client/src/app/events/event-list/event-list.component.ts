import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { CommonModule } from '@angular/common';
import { Day } from '../../_models/day';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  eventService = inject(EventsService);
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

}
