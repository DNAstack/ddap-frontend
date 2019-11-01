import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ddaplib-option-editable-list',
  templateUrl: './option-editable-list.component.html',
  styleUrls: ['./option-editable-list.component.scss'],
})
export class OptionEditableListComponent {

  newOptionValue: any = null;

  @Input()
  options: any;
  @Input()
  error: string;

  @Output()
  readonly submitted: EventEmitter<any> = new EventEmitter<any>();

  getDescriptorFor(optionKey) {
    return this.options.descriptors[optionKey];
  }

  resetSelection() {
    this.error = null;
    this.newOptionValue = null;
  }

}
