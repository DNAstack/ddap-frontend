import { Observable } from 'rxjs/Observable';

export interface EntityService {
  get(): Observable<any>;
  save(entityDto: any): Observable<any>;
  update(entityDto: any, testDto?: any): Observable<any>;
  remove(id: string): Observable<any>;
}
