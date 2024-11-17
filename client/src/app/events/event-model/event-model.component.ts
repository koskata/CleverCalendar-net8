import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from '../../_services/events.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-model',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-model.component.html',
  styleUrl: './event-model.component.css'
})
export class EventModelComponent implements OnInit {
  @Input() event: any;
  @Input() backgroundColor: string = '';
  @Input() fontColor: string = '';

  constructor(public eventService: EventsService) {}

  ngOnInit(): void {}
}
