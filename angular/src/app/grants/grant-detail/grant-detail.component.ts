import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { flatMap, pluck } from 'rxjs/operators';

import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-detail',
  templateUrl: './grant-detail.component.html',
  styleUrls: ['./grant-detail.component.scss'],
})
export class GrantDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  grant: any;
  // A (possible edited) resource from the json editor.
  grantDto: any;
  views: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public grantService: GrantService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getGrant(params['grantName']))
    ).subscribe((grantDto) => {
      this.grant = grantDto;
      this.grantDto = grantDto;
    });
  }

  private getGrant(grantName) {
    return this.grantService
      .get()
      .pipe(
        pluck(grantName)
      );
  }
}
