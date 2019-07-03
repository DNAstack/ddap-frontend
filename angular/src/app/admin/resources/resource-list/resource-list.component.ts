import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../shared/entity.model';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit {

  resources$: Observable<any[]>;

  constructor(private resourceService: ResourceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.resources$ = this.resourceService.get(this.routeDamId())
      .pipe(map(EntityModel.arrayFromMap));
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
