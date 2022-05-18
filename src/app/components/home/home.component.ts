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
  currentPage = 1;
  total = 0;
  pageSize = 10;  

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
  public handlePage(e: any) {
    this.currentPage = e.pageIndex+1;
    this.pageSize = e.pageSize;
    this.ngOnInit()
  }
  searchEvents(sort: string, search?: string): void {
    this.eventSub = this.httpService.getEventList(sort, this.pageSize, this.currentPage, search)
      .subscribe((eventList: APIResponse<Event>) => {
        this.events = eventList.events;
        this.total=eventList.meta.total;
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
