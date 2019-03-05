import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-detail',
  templateUrl: './definition-detail.component.html',
  styleUrls: ['./definition-detail.component.scss'],
})
export class DefinitionDetailComponent implements OnInit {

  definition: any;

  constructor(
    private route: ActivatedRoute,
    public definitionService: DefinitionService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getDefinition(params['definitionName']))
    ).subscribe(definition => this.definition = definition);
  }

  private getDefinition(definitionName) {
    return this.definitionService.get()
      .pipe(
        pluck(definitionName)
      );
  }
}
