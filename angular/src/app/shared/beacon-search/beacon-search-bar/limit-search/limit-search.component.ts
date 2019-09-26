import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ddap-limit-search',
  templateUrl: './limit-search.component.html',
  styleUrls: ['./limit-search.component.scss'],
})
export class LimitSearchComponent {

  @Input()
  checked;
  @Input()
  resourceName$: Observable<string>;

  @Output()
  readonly change: EventEmitter<any> = new EventEmitter<any>();

  limitSearch($event) {
    return this.change.emit($event);
  }

}
