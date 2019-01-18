import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {flatMap} from 'rxjs/operators';

import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults';
import {ResourceService} from '../resource.service';

enum ViewState {
  Editing,
  Submitting,
  Viewing,
}

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  resource: any;
  // A (possible edited) resource from the json editor.
  resourceDto: any;
  views: any;
  state: ViewState = ViewState.Viewing;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.resourceService.getResource(params['resourceName']))
    ).subscribe((resourceDto) => {
      this.resource = resourceDto;
      this.resourceDto = resourceDto;
      this.views = Object
        .keys(resourceDto.views)
        .map((key) => {
          return {
            ...resourceDto.views[key],
          };
        });
    });
  }

  updateResourceDto(event: any) {
    this.resourceDto = event;
  }

  isStateView(): boolean {
    return this.state !== ViewState.Viewing;
  }

  edit(): void {
    this.state = ViewState.Editing;
    this.setEditorMode('code');
  }

  getAccess(viewName) {
    this.resourceService.getAccessRequestToken(this.resource.name, viewName)
      .subscribe((accessToken) => {
        this.resource.views[viewName].token = accessToken;

        const view = this.resource.views[viewName];
        // tslint:disable-next-line
        const viewAccessUrl = view!.interfaces['http:gcp:gs'];
        if (viewAccessUrl) {
          this.resource.views[viewName].url = `${viewAccessUrl}/o?access_token=${accessToken}`;
        }
      });
  }

  cancel(): void {
    this.setEditorMode('view');
    this.error = null;

    switch (this.state) {
      case ViewState.Editing: {
        this.state = ViewState.Viewing;
        return;
      }
    }
  }

  isStateSubmit(): boolean {
    return this.state === ViewState.Submitting;
  }

  private setEditorMode(mode) {
    this.editorOptions.mode = mode;
    this.editor.setOptions(this.editorOptions);
  }

  private save(): void {
    this.state = ViewState.Submitting;
    this.resourceService.modifyResource(this.resourceDto)
    .subscribe(_ => {
      this.setEditorMode('view');
      this.state = ViewState.Viewing;
      this.error = null;
    }, e => {
      this.error = e.error;
      this.state = ViewState.Editing;
    });
  }
}
