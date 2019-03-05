import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';
import { EntityService } from '../shared/entity.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root',
})
export class ResourceService implements EntityService {

  private realm: string;

  constructor(private http: HttpClient,
              private realmService: RealmService) {

    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }

  getAccessRequestToken(resource, view): Observable<any[]> {
    const params = {
    };

    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/resources/${resource}/views/${view}`, { params })
      .pipe(
        pluck('token')
      );
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/config`)
      .pipe(
        pluck('resources')
      );
  }

  getResource(resourceName: string): Observable<any> {
    return this.get().pipe(
      pluck(resourceName)
    );
  }

  save(resource: any): Observable<any> {
    const params = {
    };

    if (!resource.item || !resource.item.name) {
      return throwError({error: 'The resource is missing the `item.name` field.'});
    }

    const resourceName = resource.item.name;

    return this.http.post(`${environment.damApiUrl}/${this.realm}/config/resources/${resourceName}`,
      resource,
      { params, headers }
    );
  }

  update(resource: any, test?: any): Observable<any> {
    const params = {
    };
    const resourceName = resource.name;
    const resourceChange: any = {
      item: resource,
    };

    if (test) {
      resourceChange.apply = test;
    }

    return this.http.put(`${environment.damApiUrl}/${this.realm}/config/resources/${resourceName}`,
      resourceChange,
      { params, headers }
    );
  }

  remove(id: string): Observable<any> {
    // TODO:
    return undefined;
  }
}
