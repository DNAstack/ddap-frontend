import { Component, OnInit } from '@angular/core';
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

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.resources$ = this.resourceService.get()
      .pipe(map(EntityModel.arrayFromMap));
  }

}
