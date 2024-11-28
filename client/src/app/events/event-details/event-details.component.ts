import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../_models/event';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../_services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  eventService = inject(EventsService);
  eventCreatorName: string = '';
  event: any;

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

  joinEvent() {
    console.log('Joining');
    console.log(this.event);
    this.eventService.joinEvent(this.event).subscribe({
      next: response => {
        console.log(response);
      },
    });
  }
}
