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

  errorDto: any;
  itemDto: any;

  errorEditorOptions: JsonEditorOptions;
  itemEditorOptions: JsonEditorOptions;

  @ViewChild('itemEditor')
  entityEditor: JsonEditorComponent;

  @ViewChild('errorEditor')
  errorEditor: JsonEditorComponent;

  constructor(public resourceService: ResourceService,
              private router: Router) {
    this.itemEditorOptions = new JsonEditorDefaults();
    this.errorEditorOptions = new JsonEditorDefaults();
    this.itemEditorOptions.mode = 'code';
    this.errorEditorOptions.mode = 'code';
    this.errorEditorOptions.onEditable = () => false;
  }

  ngOnInit() {
  }

  save() {
    this.resourceService.save(this.itemDto)
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
}
