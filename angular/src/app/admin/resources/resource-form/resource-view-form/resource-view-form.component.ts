import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';
import View = dam.v1.View;
import { Subscription } from 'rxjs/Subscription';

import { dam } from '../../../../shared/proto/dam-service';
import { ServiceDefinitionService } from '../../../service-definitions/service-definitions.service';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';

@Component({
  selector: 'ddap-resource-view-form',
  templateUrl: './resource-view-form.component.html',
  styleUrls: ['./resource-view-form.component.scss'],
})
export class ResourceViewFormComponent implements OnInit, OnDestroy {

  @Input()
  view: EntityModel;

  viewForm: FormGroup;
  templates: EntityModel[];
  templatesSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private serviceTemplateService: ServiceDefinitionService) {
  }

  get serviceTemplate(): string {
    return this.viewForm.get('serviceTemplate').value;
  }

  get selectedTemplate(): EntityModel {
    if (!this.templates) {
      return null;
    }
    return this.templates.find(this.equalToSelectedTemplateName);
  }

  get variableItems() {
    return this.viewForm.get('variables') as FormArray;
  }

  ngOnInit() {
    if (!this.view || !this.view.name) {
      this.view = new EntityModel('', View.create());
    }
    const { name, dto } = this.view;

    this.viewForm = this.formBuilder.group({
      id: [name || '', [Validators.pattern(nameConstraintPattern)]],
      serviceTemplate: [dto.serviceTemplate || '', [Validators.required]],
      defaultRole: [dto.defaultRole || '', [Validators.required]],
      version: [dto.version || '', [Validators.required]],
      topic: [dto.topic || '', []],
      partition: [dto.partition || '', []],
      fidelity: [dto.fidelity || '', []],
      geoLocation: [dto.geoLocation || '', []],
      aud: [dto.aud || '', [Validators.required]],
      contentTypes: [dto.contentTypes || '', []],
      ui: this.formBuilder.group({
        label: [dto.ui.label || '', [Validators.required]],
      }),
    });

    this.templatesSubscription = this.serviceTemplateService.getList().subscribe((templates) => {
      this.templates = templates;
      if (this.selectedTemplate) {
        this.rebuildPoliciesForRolesForm();
        this.rebuildVariablesForItemsForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.templatesSubscription.unsubscribe();
  }

  isDefaultRole(roleId: string) {
    return this.viewForm.get('defaultRole').value === roleId;
  }

  makeDefaultRole(roleId: string) {
    this.viewForm.get('defaultRole').setValue(roleId);
  }

  serviceTemplateChange() {
    this.rebuildPoliciesForRolesForm();
    this.rebuildVariablesForItemsForm();
  }

  rebuildPoliciesForRolesForm(): void {
    const roles: string[] = Object.keys(_get(this.selectedTemplate, 'dto.roles', []));
    const rolesFormGroup: FormGroup = this.formBuilder.group({});
    roles.forEach((role) => {
      rolesFormGroup.addControl(role, this.formBuilder.group({
        policies: [this.getPoliciesForRole(role)],
      }));
    });

    this.viewForm.setControl('roles', rolesFormGroup);
  }

  rebuildVariablesForItemsForm(): void {
    this.getVariablesBySelectedTemplate().subscribe((vars) => {
      const varArray: FormArray = this.formBuilder.array([]);
      Object.entries(vars).forEach(([key, value]: any) => {
        const { ui, regexp, optional } = value;
        varArray.push(this.formBuilder.group({
          name: [key],
          label: [ui.label],
          description: [ui.description],
          optional: [optional],
          regexp: [regexp],
          value: [this.getValueForVariable(key), regexp && !optional ? [Validators.pattern(regexp)] : []],
        }));
      });

      this.viewForm.setControl('variables', varArray);
    });
  }

  getVariablesBySelectedTemplate(): Observable<any> {
    return this.serviceTemplateService.getTargetAdapterVariables({ serviceTemplate: this.viewForm.get('serviceTemplate').value });
  }

  private getPoliciesForRole(roleId: string): string[] {
    return _get(this.view, `dto.roles[${roleId}].policies`, []);
  }

  private getValueForVariable(variableId: string): string {
    return _get(this.view, `dto.items[0].vars[${variableId}]`, '');
  }

  private equalToSelectedTemplateName = (template) => template.name === this.viewForm.get('serviceTemplate').value;
}
