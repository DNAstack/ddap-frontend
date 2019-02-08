import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { flatMap, pluck } from 'rxjs/operators';

import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-detail',
  templateUrl: './definition-detail.component.html',
  styleUrls: ['./definition-detail.component.scss'],
})
export class DefinitionDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  definition: any;
  // A (possible edited) resource from the json editor.
  definitionDto: any;
  views: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public definitionService: DefinitionService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getDefinition(params['definitionName']))
    ).subscribe((definitionDto) => {
      this.definition = definitionDto;
      this.definitionDto = definitionDto;
    });
  }

  private getDefinition(definitionName) {
    return this.definitionService
      .get()
      .pipe(
        pluck(definitionName)
      );
  }
}
