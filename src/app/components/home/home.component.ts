import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Event } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public sort!: string;
  public events: Event[] = [];
  private routeSub!: Subscription;
  private eventSub!: Subscription;

  constructor(    
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['event-search']) {
          this.searchEvents('announce_date.desc', params['event-search']);
        } else {
          this.searchEvents('announce_date.desc');
        }

      });
    }
  
    searchEvents(sort: string, search?: string): void {
      this.eventSub = this.httpService.getEventList(sort, search)
        .subscribe((eventList: APIResponse<Event>) => {
          this.events = eventList.events;
          console.log(eventList);
        });
    }
    openEventDetails(id: string): void {
      this.router.navigate(['details', id]);
      
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
