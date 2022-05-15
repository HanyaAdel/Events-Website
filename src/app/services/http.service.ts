import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

import { APIResponse } from '../model';
import { Event } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getEventList(sort: string, perPage:number, pageNumber:number,search?: string): Observable<APIResponse<Event>> {
    let params = new HttpParams().set('sort', sort).set('per_page', perPage).set('page', pageNumber)

    if (search) {
      params = new HttpParams().set('sort', sort).set('per_page', perPage).set('page', pageNumber).set('q', search);
    }

    return this.http.get<APIResponse<Event>>(`${env.BASE_URL}/events`, {
      params: params,
    });
  }

  getEventDetails(id: string): Observable<Event> {
    let eventInfoRequest = this.http.get(`${env.BASE_URL}/events/${id}`);

    
    return forkJoin({
      eventInfoRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['eventInfoRequest'],
        };
      })
    );
  }
}