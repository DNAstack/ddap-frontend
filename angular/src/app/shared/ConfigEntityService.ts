import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap, pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

export class ConfigEntityService implements EntityService {

  constructor(protected http: HttpClient, protected entityName: string) { }

  get(params?): any {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/config', { params })
      .pipe(
        pluck(this.entityName)
      );
  }

  save(dto: any): any {
    const params = {
      persona: 'nci_researcher',
    };
    const id = dto.name;

    return this.http.get<any[]>(environment.ddapApiUrl + '/config', { params })
      .pipe(
        mergeMap((config: any) => {
          config[this.entityName][id] = dto;
          return this.updateConfig(config);
        })
      );
  }

  update(dto: any): any {
      return this.save(dto);
  }

  private updateConfig(config: object): any {
    const params = {
      persona: 'nci_researcher',
    };

    return this.http.put(
      environment.ddapApiUrl + '/config',
      { item: config },
      { params, headers }
    );
  }

}
