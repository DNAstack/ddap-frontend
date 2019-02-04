import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


import { DnaChangeQueryParser } from './DnaChangeQueryParser';

@Injectable()
export class ResourceViewBeaconService {

  constructor(private http: HttpClient) {
  }

  queryBeaconIfAvailable(query, resource): any {
    if (!DnaChangeQueryParser.validate(query)) {
      return;
    }

    const beaconUrls = this.getBeaconUrls(this.getViews(resource));
    if (beaconUrls.length < 1) {
      return;
    }

    return beaconUrls.map(url => this.queryBeacon(url, DnaChangeQueryParser.parseParams(query)));
  }

  private queryBeacon(url, params?) {
    this.http.get<any>(`${url}`, { params })
      .pipe(
        map(this.buildBeaconResponse)
      )
      .subscribe();
  }

  // TODO: beaconName, orgName
  private buildBeaconResponse(response) {
    return {
      name: '%Beacon Name%',
      organization: '%Organization Name%',
      query: {
        result: response.exists ? 'Found' : 'Not found',
      },
    };
  }

  private getViews(resource) {
    return Object
      .keys(resource.views)
      .map((key) => {
        return {
          ...resource.views[key],
        };
      });
  }

  private hasBeaconView(view) {
    return 'http:beacon' in view.interfaces;
  }

  private getBeaconUrls(views) {
    return views
      .filter(this.hasBeaconView)
      .map(view => view.interfaces['http:beacon']);
  }

}
