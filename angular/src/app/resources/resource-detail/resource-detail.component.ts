import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit, OnDestroy {

  resource$: Observable<any>;
  private routeParams: Subscription;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.routeParams = this.route.params.subscribe(params => {
       this.resource$ = this.resourceService.getResource(params['resourceName']);
    });
  }

  ngOnDestroy() {
    this.routeParams.unsubscribe();
  }

}
