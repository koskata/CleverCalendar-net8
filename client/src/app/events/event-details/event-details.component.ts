import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../_models/event';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../_services/events.service';
import { CommonModule } from '@angular/common';
import { EventJoinedParticipantsModalComponent } from "../../event-joined-participants-modal/event-joined-participants-modal.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule, CommonModule, EventJoinedParticipantsModalComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);
  eventService = inject(EventsService);
  eventCreatorName: string = '';
  event: any;
  showModal = false;

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id')
    const realId = Number(eventId);;
    console.log(realId);
    if (realId) {
      this.fetchEventDetails(realId);
    }
  }

  fetchEventDetails(id: number): void {
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
      this.eventCreatorName = event.creatorName;
    });
  }

  modalToggle() {
    this.showModal = !this.showModal;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }

  joinEvent() {
    console.log(this.event.id);
    if (!this.event || !this.event.id) {
      this.toastr.error("Event details are missing!", "Error");
      return;
    }

    this.eventService.joinEvent(this.event.id).subscribe({
      next: (response) => {
        this.toastr.success("Successfully joined the event!", "Success");
        console.log("Successfully joined the event:", response);
      },
      error: (error) => {
        console.error("Error joining the event:", error);
      }
    });
  }
}
