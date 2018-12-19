import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  resources$: Observable<any>;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resources$ = this.resourceService.getResources();
  }

}
