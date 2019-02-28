import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
})
export class ResourceManageComponent implements OnInit {

  applyDto: any;
  errorDto: any;
  itemDto: any;

  applyEditorOptions: JsonEditorOptions;
  errorEditorOptions: JsonEditorOptions;
  itemEditorOptions: JsonEditorOptions;

  @ViewChild('applyEditor')
  applyEditor: JsonEditorComponent;

  @ViewChild('errorEditor')
  errorEditor: JsonEditorComponent;

  @ViewChild('itemEditor')
  entityEditor: JsonEditorComponent;

  constructor(public resourceService: ResourceService,
              private router: Router) {
    this.applyEditorOptions = new JsonEditorDefaults();
    this.errorEditorOptions = new JsonEditorDefaults();
    this.itemEditorOptions = new JsonEditorDefaults();
    this.applyEditorOptions.mode = 'code';
    this.errorEditorOptions.mode = 'code';
    this.itemEditorOptions.mode = 'code';
    this.errorEditorOptions.onEditable = () => false;
  }

  ngOnInit() {
  }

  save() {
    const resource = {
      item: this.itemDto,
      apply: this.applyDto,
    };

    this.resourceService.save(resource)
      .subscribe(() => {
        this.router.navigate(['/resources']);
        },
        (errorDto) => {
        this.errorDto = errorDto.error;
      });
  }

  updateItemDto(event: any) {
    this.itemDto = event;
  }

  updateApplyDto(event: any) {
    this.applyDto = event;
  }
}
