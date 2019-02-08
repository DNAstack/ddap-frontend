import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { flatMap, pluck } from 'rxjs/operators';

import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-detail',
  templateUrl: './passport-detail.component.html',
  styleUrls: ['./passport-detail.component.scss'],
})
export class PassportDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  passport: any;
  // A (possible edited) resource from the json editor.
  passportDto: any;
  views: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public passportService: PassportService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getPassport(params['passportName']))
    ).subscribe((passportDto) => {
      this.passport = passportDto;
      this.passportDto = passportDto;
    });
  }

  private getPassport(passportName) {
    return this.passportService
      .get()
      .pipe(
        pluck(passportName)
      );
  }
}
