import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {from, Observable, of} from 'rxjs';

import {ResourceService} from '../resource.service';
import {catchError, flatMap} from "rxjs/operators";

enum ViewState {
  Editing,
  Submitting,
  Viewing
}

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {

  resource: any;
  views: any;
  state: ViewState = ViewState.Viewing;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.resourceService.getResource(params['resourceName']))
    ).subscribe((resourceDto) => {
      this.resource = resourceDto;
      this.views = Object
        .keys(resourceDto.views)
        .map((key) => {
          return {
            ...resourceDto.views[key]
          }
        });
    });
  }

  submit(value: string) {
    switch (this.state) {
      case ViewState.Editing: {
        this.doSubmit(value);
      }
    }
  }

  private doSubmit(value: string): void {
    this.state = ViewState.Submitting;
    this.resourceService.modifyResource(JSON.parse(value)).pipe(
      catchError(err => {
        console.log("Unexpected error.", err);
        return of();
      })
    ).subscribe(_ => {
      this.state = ViewState.Viewing;
    });
  }

  showEditControls(): boolean {
    return this.state !== ViewState.Viewing;
  }

  disableTextArea(): boolean {
    return this.state !== ViewState.Editing;
  }

  edit(): void {
    switch (this.state) {
      case ViewState.Viewing: {
        this.state = ViewState.Editing;
        return;
      }
    }
  }

  getAccess(viewName) {
    this.resourceService.getAccessRequestToken(this.resource.name, viewName)
      .subscribe((accessToken) => {
        this.resource.views[viewName].token = accessToken;

        const view = this.resource.views[viewName];
        const viewAccessUrl = view!.interfaces['http:gcp:gs'];
        if (viewAccessUrl) {
          this.resource.views[viewName].url = `${viewAccessUrl}/o?access_token=${accessToken}`;
        }
      });
  }

  cancel(): void {
    switch (this.state) {
      case ViewState.Editing: {
        this.state = ViewState.Viewing;
        return;
      }
    }
  }

  isSubmitting(): boolean {
    return this.state === ViewState.Submitting;
  }
}
