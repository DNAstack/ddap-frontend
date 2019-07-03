import { Observable } from 'rxjs/Observable';

import { ConfigModificationObject } from './configModificationObject';
import { EntityModel } from './entity.model';

export interface EntityService {
  get(): Observable<Map<string, EntityModel>>;
  save(entityId: string, change: ConfigModificationObject): Observable<any>;
  update(entityId: string, change: ConfigModificationObject): Observable<any>;
  remove(entityId: string): Observable<any>;
}
