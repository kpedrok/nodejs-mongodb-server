import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { Leader } from '../../shared/leader';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the LeaderProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgProvider) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}