import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  public extractData(res) {
    let body = res;
    return body || {};
  }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
