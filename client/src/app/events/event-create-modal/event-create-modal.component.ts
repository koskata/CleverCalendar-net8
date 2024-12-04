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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-create-modal',
  standalone: true,
  imports: [FormsModule, DropdownModule, NgIf, CalendarModule, InputMaskModule, InputTextModule],
  templateUrl: './event-create-modal.component.html',
  styleUrl: './event-create-modal.component.css'
})
export class EventCreateModalComponent implements OnInit {
  private toastr = inject(ToastrService);
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

    console.log(this.model.start);
    console.log(this.model.end);
    if (this.model.start > this.model.end) {
      this.toastr.error("Cannot create event with bigger start than end date!", "Error");
    }

    this.eventService.createEvent(this.model).subscribe({
      next: response => {
        console.log(response);
        this.model.id = response.id;
        this.joinEvent();
        this.close();
        this.toastr.success("Successfully created event!", "Success");
      },
    });
    
  }

  close() {
    console.log('Close button clicked');
    this.closeModal.emit(false);
  }

  joinEvent() {
    console.log(this.model.id);
    if (!this.model || !this.model.id) {
      console.error("Event details are missing.");
      return;
    }

    this.eventService.joinEvent(this.model.id).subscribe({
      next: (response) => {
        console.log("Successfully joined the event:", response);
      },
      error: (error) => {
        console.error("Error joining the event:", error);
      }
    });
  }
}
