import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { CommonModule, NgIf } from '@angular/common';
import { Day } from '../../_models/day';
import { EventCreateModalComponent } from "../event-create-modal/event-create-modal.component";

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
  monthYear: number = new Date().getFullYear();;
  monthEmoticon: string = '';
  showModal = false;
  currentMonthIndex: number = new Date().getMonth();

  ngOnInit(): void {
    this.setMonthEmoticons();
    this.loadEvents();
    this.daysInMonth = this.eventService.generateDaysInMonth(this.currentMonthIndex, this.monthYear);
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
    const { monthName, monthEmoticon } = this.eventService.setMonthEmoticons(this.currentMonthIndex);
    console.log(this.monthYear);
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

  changeMonth(direction: number) {
    this.currentMonthIndex += direction; // +1 for next, -1 for previous
    if (this.currentMonthIndex < 0) {
      this.currentMonthIndex = 11; // Wrap around to December
      this.monthYear -= 1;
    } else if (this.currentMonthIndex > 11) {
      this.currentMonthIndex = 0; // Wrap around to January
      this.monthYear += 1;
    }
    console.log(this.monthYear);
    this.setMonthEmoticons(); // Update the month display and emoticon

    this.daysInMonth = this.eventService.generateDaysInMonth(this.currentMonthIndex, this.monthYear); // Generate days for the new month

    this.loadEvents(); // Reload events for the new month
  }

}
