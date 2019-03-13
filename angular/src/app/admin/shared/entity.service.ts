import { Observable } from 'rxjs/Observable';

import { ConfigModificationObject } from './configModificationObject';
import { EntityModel } from './entity.model';

export interface EntityService {
  get(): Observable<Map<string, EntityModel>>;
  save(id: string, change: ConfigModificationObject): Observable<any>;
  update(id: string, change: ConfigModificationObject): Observable<any>;
  remove(id: string): Observable<any>;
}
