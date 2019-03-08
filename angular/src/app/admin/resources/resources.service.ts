import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';
import { ChangeDto } from '../shared/change.dto';
import { ChangeModel } from '../shared/change.model';
import { ConfigModel } from '../shared/config.model';
import { EntityModel } from '../shared/entity.model';
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

  get(): Observable<Map<string, EntityModel>> {
    return this.http.get<ConfigModel>(`${environment.damApiUrl}/${this.realm}/config`)
      .pipe(
        map(config => config.resources),
        map(EntityModel.objectToMap)
      );
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get().pipe(
      map(resources => resources.get(resourceName))
    );
  }

  save(change: ChangeModel): Observable<any> {
    return this.saveDto(this.createDto(change));
  }

  // We should try and get rid of this soon, and edit in terms of a separate model.
  saveDto(dto: ChangeDto): Observable<any> {
    if (!dto.item || !dto.item.name) {
      return throwError({error: 'The resource is missing the `item.name` field.'});
    }

    const resourceName = dto.item.name;

    return this.http.post(`${environment.damApiUrl}/${this.realm}/config/resources/${resourceName}`,
      dto,
      { headers }
    );
  }

  update(change: ChangeModel): Observable<any> {
    const params = {
    };
    const dto = this.createDto(change);

    return this.http.put(`${environment.damApiUrl}/${this.realm}/config/resources/${dto.item.name}`,
      dto,
      { params, headers }
    );
  }

  remove(id: string): Observable<any> {
    throw new Error('Not yet implemented.');
  }

  protected createDto(change: ChangeModel): ChangeDto {
    const item = {
      name: change.entity.name,
      ...change.entity.dto,
    };
    const dto = new ChangeDto(item, change.apply);
    return dto;
  }
}
