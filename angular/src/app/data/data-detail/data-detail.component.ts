import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { flatMap } from 'rxjs/operators';

import { ResourceService } from '../../resources/resource.service';
import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { ImagePlaceholderRetriever } from '../../shared/RandomImageRetriever';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss'],
  providers: [ImagePlaceholderRetriever],
  // Easiest way to override inner component styles; https://stackoverflow.com/a/36225709
  encapsulation: ViewEncapsulation.None,
})
export class DataDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  resource: any;
  // A (possible edited) resource from the json editor.
  resourceDto: any;
  views: any;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public resourceService: ResourceService,
    public randomImageRetriever: ImagePlaceholderRetriever
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
}
