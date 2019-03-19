import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../../shared/entity-detail.base';
import { OptionService } from '../options.service';

@Component({
  selector: 'ddap-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrls: ['./option-detail.component.scss'],
})
export class OptionDetailComponent extends EntityDetailBase<OptionService> implements OnInit {
  constructor(route: ActivatedRoute, optionService: OptionService) {
    super(route, optionService, 'optionName');
  }
}
