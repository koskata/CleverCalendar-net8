import { Component, EventEmitter, inject, OnInit, output, Output, signal } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { FormsModule } from '@angular/forms';
import { EventCategory } from '../../_models/eventCategory';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-event-create-modal',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './event-create-modal.component.html',
  styleUrl: './event-create-modal.component.css'
})
export class EventCreateModalComponent implements OnInit {
  // categories: EventCategory[] = [];
  // selectedCategory: string | null = null; 

  private eventService = inject(EventsService);
  closeModal = output<boolean>();

  model: any = {};
  
  ngOnInit(): void {
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


  categories: EventCategory[] = [
    { id: 1, name: 'Work', color: 'Purple' },
    { id: 2, name: 'Personal', color: 'Purple' },
    { id: 3, name: 'Travel', color: 'Purple' }
  ];
  
  selectedCategory: string | null = null;
  
  selectCategory(category: EventCategory) {
    this.selectedCategory = category.name;
    console.log('Selected Category:', category.name);
  }
}
