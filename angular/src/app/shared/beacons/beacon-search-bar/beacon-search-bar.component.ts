import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ddap-beacon-search-bar',
  templateUrl: './beacon-search-bar.component.html',
  styleUrls: ['./beacon-search-bar.component.scss'],
})
export class BeaconSearchBarComponent {

  @Input()
  placeholder: string;
  @Input()
  disabled: boolean;

  @Output()
  valueChanged: EventEmitter<object> = new EventEmitter<object>();

  public assemblyIds = ['GRCh37', 'GRCh38', 'NCBI36'];
  public selectedAssemblyId = 'GRCh37';
  private value = null;
  private valueUpdated: Subject<object> = new Subject();

  constructor() {
    this.valueUpdated.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => this.valueChanged.emit(value));
  }

  emitChange(value?): void {
    if (value) {
      this.value = value;
    }

    this.valueUpdated.next({
      value: this.value,
      assemblyId: this.selectedAssemblyId,
    });
  }
}
