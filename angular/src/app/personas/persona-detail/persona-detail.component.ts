import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { flatMap, pluck } from 'rxjs/operators';

import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
})
export class PersonaDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  persona: any;
  // A (possible edited) resource from the json editor.
  personaDto: any;
  views: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public personaService: PersonaService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getPersona(params['personaName']))
    ).subscribe((personaDto) => {
      this.persona = personaDto;
      this.personaDto = personaDto;
    });
  }

  private getPersona(personaName) {
    return this.personaService
      .get()
      .pipe(
        pluck(personaName)
      );
  }
}
