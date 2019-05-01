import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpParamsService {

  getHttpParamsFrom(object: object): HttpParams {
    let params = new HttpParams();
    Object.entries(object)
      .forEach(([key, value]) => params = params.set(key, value));
    return params;
  }

}
