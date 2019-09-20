import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PaginationTypes } from './pagination-type.enum';

@Component({
  selector: 'ddap-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {

  @Input()
  nextPage?: string;
  @Input()
  previousPage?: string;
  @Input()
  paginationType: string = PaginationTypes.bidirectional;

  @Output()
  pageChangeRequested: EventEmitter<string> = new EventEmitter<string>();

  changePage(page: string) {
    this.pageChangeRequested.emit(page);
  }

  showPrevious() {
    return this.paginationType !== PaginationTypes.unidirectional;
  }
}
