import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    submitFeedback(feedback:Feedback){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      const body = JSON.stringify(feedback);
      return this.http.post<Feedback>(baseURL + 'feedback/', body, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));

    }
}
