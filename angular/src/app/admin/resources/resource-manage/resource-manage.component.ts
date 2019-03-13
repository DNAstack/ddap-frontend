import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
})
export class ResourceManageComponent implements OnInit {

  errorDto: any;
  resourceId: string;
  item: any;
  test: any;

  errorEditorOptions: JsonEditorOptions;
  itemEditorOptions: JsonEditorOptions;
  testEditorOptions: JsonEditorOptions;

  @ViewChild('errorEditor')
  errorEditor: JsonEditorComponent;

  @ViewChild('itemEditor')
  itemEditor: JsonEditorComponent;

  @ViewChild('testEditor')
  testEditor: JsonEditorComponent;

  constructor(public resourceService: ResourceService,
              private router: Router,
              private route: ActivatedRoute) {
    this.errorEditorOptions = new JsonEditorDefaults();
    this.itemEditorOptions = new JsonEditorDefaults();
    this.testEditorOptions = new JsonEditorDefaults();

    this.errorEditorOptions.mode = 'code';
    this.errorEditorOptions.onEditable = () => false;

    this.itemEditorOptions.mode = 'code';
    this.testEditorOptions.mode = 'code';
  }

  ngOnInit() {
  }

  save() {
    const change = new ConfigModificationObject(this.item, this.test);

    this.resourceService.save(this.resourceId, change).subscribe(
      () => this.goToResourceList(),
      ({error}) => this.errorDto = error
    );
  }

  updateItemDto(event: any) {
    this.item = event;
  }

  updateTestDto(event: any) {
    this.test = event;
  }

  private goToResourceList() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }

}
