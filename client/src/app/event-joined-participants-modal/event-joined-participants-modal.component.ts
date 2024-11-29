import { Component, inject, OnInit, output } from '@angular/core';
import { EventParticipant } from '../_models/eventParticipant';
import { EventsService } from '../_services/events.service';

@Component({
  selector: 'app-event-joined-participants-modal',
  standalone: true,
  imports: [],
  templateUrl: './event-joined-participants-modal.component.html',
  styleUrl: './event-joined-participants-modal.component.css'
})
export class EventJoinedParticipantsModalComponent implements OnInit {


  ngOnInit(): void {
    this.loadEventsParticipants();
  }


  eventService = inject(EventsService); 
  closeModal = output<boolean>();
  eventsParticipants: EventParticipant[] = [];

  close() {
    console.log('Close button clicked');
    this.closeModal.emit(false);
  }

  loadEventsParticipants() {
    this.eventService.getEventsParticipants().subscribe({
      next: (eventsParticipants) => {
        this.eventsParticipants = eventsParticipants;
        console.log(this.eventsParticipants);
      }
    });
  }
}
