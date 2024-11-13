import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { CommonModule, NgIf } from '@angular/common';
import { Day } from '../../_models/day';
import { EventCreateModalComponent } from "../event-create-modal/event-create-modal.component";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCreateModalComponent, NgIf],
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
  showModal = false;

  ngOnInit(): void {
    this.setMonthEmoticons();
    this.loadEvents();
    this.daysInMonth = this.eventService.generateDaysInMonth();
    console.log(this.events);
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        console.log(this.events);
      }
    });
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

  setMonthEmoticons() {
    const { monthName, monthEmoticon } = this.eventService.setMonthEmoticons();
    this.monthName = monthName;
    this.monthEmoticon = monthEmoticon;
  }
  
  modalToggle() {
    this.showModal = !this.showModal;
  }

  closeModal(event: boolean) {
    console.log('Modal close event received');
    this.showModal = event;
    this.loadEvents();
  }

}
