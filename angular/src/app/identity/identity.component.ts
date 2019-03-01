import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Subscription } from 'rxjs/Subscription';

import { JsonEditorDefaults } from '../admin/shared/jsonEditorDefaults';

import { IdentityService } from './identity.service';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit {

  identity: any;
  identityEditorOptions: JsonEditorOptions;
  identitySubscription: Subscription;

  @ViewChild('identityEditor')
  identityEditor: JsonEditorComponent;

  constructor(private accountService: IdentityService) {
    this.identityEditorOptions = new JsonEditorDefaults();
    this.identityEditorOptions.expandAll = true;
    this.identityEditorOptions.onEditable = () => false;
  }

  ngOnInit(): void {
    this.identitySubscription = this.accountService.get().subscribe((accountDto) => {
      this.identity = accountDto;
    });
  }

}
