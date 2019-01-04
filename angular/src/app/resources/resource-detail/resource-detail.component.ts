import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';

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

  resource$: Observable<any>;
  state: ViewState = ViewState.Viewing;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.resource$ = this.route.params.pipe(
      flatMap(params => this.resourceService.getResource(params['resourceName']))
    );
    this.resource$.subscribe();
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
