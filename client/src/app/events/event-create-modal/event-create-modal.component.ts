import { Component, EventEmitter, inject, output, Output, signal } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { Event } from '../../_models/event';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-create-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-create-modal.component.html',
  styleUrl: './event-create-modal.component.css'
})
export class EventCreateModalComponent {
  private eventService = inject(EventsService);
  closeModal = output<boolean>();
  // event: Partial<Event> = {
  //   name: '',
  //   start: new Date(),
  //   end: new Date(),
  //   location: '',
  //   categoryId: 1,
  // };

  model: any;

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
