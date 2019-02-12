import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ddap-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {

  @Input()
  placeholder: string;
  @Input()
  disabled: boolean;

  @Output()
  valueChanged: EventEmitter<string> = new EventEmitter<string>();

  private valueUpdated: Subject<string> = new Subject();

  constructor() {
    this.valueUpdated.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => this.valueChanged.emit(value));
  }

  onKeyUp(value): void {
    this.valueUpdated.next(value);
  }
}
