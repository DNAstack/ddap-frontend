import { Observable } from 'rxjs/Observable';

import { ChangeModel } from './change.model';
import { EntityModel } from './entity.model';

export interface EntityService {
  get(): Observable<Map<string, EntityModel>>;
  save(change: ChangeModel): Observable<any>;
  update(change: ChangeModel): Observable<any>;
  remove(id: string): Observable<any>;
}
