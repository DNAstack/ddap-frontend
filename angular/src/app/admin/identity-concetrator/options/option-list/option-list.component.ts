import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';
import { OptionService } from '../options.service';

@Component({
  selector: 'ddap-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit {

  options$: Observable<any[]>;

  constructor(private optionService: OptionService) {
  }

  ngOnInit() {
    this.options$ = this.optionService.get()
      .pipe(map(EntityModel.arrayFromMap));
  }

}
