import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { Promotion } from '../../shared/promotion';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the PromotionProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgProvider) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
      .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}