import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class Store<T> {

  public readonly state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state (): T {
    return this._state$.getValue();
  }

  public setState (nextState: T) {
    this._state$.next(nextState);
  }

}
