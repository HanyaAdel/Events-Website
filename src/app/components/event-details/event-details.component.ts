import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import {Event } from 'src/app/model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  public eventId!: string;
  event!: Event;
  routeSub!: Subscription;
  eventSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.eventId = params['id'];
      this.getEventDetails(this.eventId);
    });
  }

  getEventDetails(id: string): void {
    this.eventSub = this.httpService.getEventDetails(id).subscribe((eventResp: Event) => {
        this.event = eventResp;
        console.log(this.event.performers[0]);
      });
  }

  ngOnDestroy(): void {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
