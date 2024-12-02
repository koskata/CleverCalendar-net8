import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import { EventParticipant } from '../_models/eventParticipant';
import { EventsService } from '../_services/events.service';
import { Event } from '../_models/event';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../_models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-joined-participants-modal',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './event-joined-participants-modal.component.html',
  styleUrl: './event-joined-participants-modal.component.css'
})
export class EventJoinedParticipantsModalComponent implements OnInit {


  ngOnInit(): void {
    this.loadEventsParticipants();
  }


  eventService = inject(EventsService); 
  closeModal = output<boolean>();
  eventParticipants: User[] = [];
  @Input() eventModel: any;
  searchText: string = '';
  sortField: string = '';
  sortAsc: boolean = true;

  close() {
    console.log('Close button clicked');
    this.closeModal.emit(false);
  }

  loadEventsParticipants() {
    console.log(this.eventModel.id);
    this.eventService.getEventsParticipantsForTheGivenEvent(this.eventModel.id).subscribe({
      next: (eventsParticipants) => {
        this.eventParticipants = eventsParticipants;
        console.log(this.eventParticipants);
      }
    });
  }

  filteredParticipants() {
    return this.eventParticipants
      .filter(participant =>
        participant.name.toLowerCase().includes(this.searchText.toLowerCase())
      ).sort((a, b) => {
        const valueA = (a as any)[this.sortField]?.toString().toLowerCase();
        const valueB = (b as any)[this.sortField]?.toString().toLowerCase();
        if (!this.sortField) return 0;

        if (valueA < valueB) return this.sortAsc ? -1 : 1;
        if (valueA > valueB) return this.sortAsc ? 1 : -1;
        return 0;
      });
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }

  joinEvent() {
    console.log(this.eventModel.id);
    if (!this.eventModel || !this.eventModel.id) {
      console.error("Event details are missing.");
      return;
    }

    this.eventService.joinEvent(this.eventModel.id).subscribe({
      next: (response) => {
        console.log("Successfully joined the event:", response);
      },
      error: (error) => {
        console.error("Error joining the event:", error);
      }
    });
  }
}
