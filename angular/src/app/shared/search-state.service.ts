import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SearchState } from './search-state.model';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {

  searchState: BehaviorSubject<SearchState>;

  private state: SearchState = new SearchState();

  constructor(private route: ActivatedRoute) {
    this.searchState = new BehaviorSubject<SearchState>(this.state);

    this.route.queryParams
      .subscribe(
        (params: any) => {
          const {assembly, query, resource, limitSearch} = params;
          let limitSearchUpdated = false;

          if (this.state.limitSearch === null && resource) {
            limitSearchUpdated = true;
          } else if ( limitSearch === true ) {
            limitSearchUpdated = true;
          }

          this.patch({
            assembly,
            query,
            resource,
            limitSearch: limitSearchUpdated,
          });
        });
  }

  patch(stateChange: any) {
    this.state = {
      ...this.state,
      ...stateChange,
    };

    this.searchState.next(this.state);
  }

}
