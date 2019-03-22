import { Component, OnInit } from '@angular/core';

import { OptionService } from '../options.service';

@Component({
  selector: 'ddap-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit {

  options: any;
  newOptionValue: any = null;
  error: string = null;

  constructor(public optionService: OptionService) {
  }

  ngOnInit() {
    this.optionService.get()
      .subscribe((options) => this.options = options);
  }

  getDescriptorFor(optionKey) {
    return this.options.descriptors[optionKey];
  }

  updateOptionValue(optionKey, newValue) {
    const newOptions = this.cloneOptions();
    newOptions[optionKey] = newValue;

    this.optionService.update(newOptions)
      .subscribe(
        () => this.options[optionKey] = newValue,
        (response) => {
          const message = response.error;
          this.error = message.substring(message.lastIndexOf(':') + 1);
        }
      );
  }

  resetSelection() {
    this.error = null;
    this.newOptionValue = null;
  }

  private cloneOptions(): object {
    return Object.assign({}, this.options);
  }

}
