import { Component, EventEmitter, inject, OnInit, output, Output, signal } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { FormsModule } from '@angular/forms';
import { EventCategory } from '../../_models/eventCategory';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-event-create-modal',
  standalone: true,
  imports: [FormsModule, DropdownModule, NgIf, CalendarModule, InputMaskModule, InputTextModule],
  templateUrl: './event-create-modal.component.html',
  styleUrl: './event-create-modal.component.css'
})
export class EventCreateModalComponent implements OnInit {
  private eventService = inject(EventsService);
  closeModal = output<boolean>();
  categories: EventCategory[] = [];

  model: any = {};

  ngOnInit(): void {
    this.generateCategoriesForEventsFromDatabase();
  }

  generateCategoriesForEventsFromDatabase() {
    this.eventService.getCategoriesFromDatabase().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  create() {
    console.log('Form submitted');
    this.eventService.createEvent(this.model).subscribe({
      next: response => {
        console.log(response);
        this.close();
      },
    });
  }

  close() {
    console.log('Close button clicked');
    this.closeModal.emit(false);
  }
}
