import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
     /*
     not working 
     figure out why
      setHeaders: {
        'X-RapidAPI-Host': 'seatgeek-seatgeekcom.p.rapidapi.com',
        'X-RapidAPI-Key': 'a0c133d65fmshd5d36bc1824ef4dp11f7f8jsn1b98f6d2b970'
      },*/
      setParams: {
        client_id: 'MjY3OTk1NjF8MTY1MTQ0Mzg5OS42MzA5NDc ',
      }
    });
    return next.handle(req);
  }
}