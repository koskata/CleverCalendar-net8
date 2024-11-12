import { Component, EventEmitter, inject, OnInit, output, Output, signal } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { FormsModule } from '@angular/forms';
import { EventCategory } from '../../_models/eventCategory';
import { NgFor, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-event-create-modal',
  standalone: true,
  imports: [FormsModule, DropdownModule, NgIf],
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
        this.categories = categories; // Assign the fetched categories to the `categories` array.
      },
      error: (err) => {
        console.error('Error fetching categories:', err); // Log any error.
      }
    });
  }

  create() {
    // if (this.event.name && this.event.start && this.event.end) {
      console.log('Form submitted');
      this.eventService.createEvent(this.model).subscribe({
        next: response => {
          console.log(response);
          this.close();
        },
      });
    // }
  }

  close() {
    console.log('Close button clicked');
    this.closeModal.emit(false);
  }
}
