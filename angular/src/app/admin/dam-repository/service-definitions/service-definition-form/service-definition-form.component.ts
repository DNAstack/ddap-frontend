import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import { dam } from 'src/app/shared/proto/dam-service';

import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';
import ServiceTemplate = dam.v1.ServiceTemplate;
import ServiceRole = dam.v1.ServiceRole;
import { ServiceDefinitionService } from '../service-definitions.service';

@Component({
  selector: 'ddap-service-definition-form',
  templateUrl: './service-definition-form.component.html',
  styleUrls: ['./service-definition-form.component.scss'],
})
export class ServiceDefinitionFormComponent implements OnInit, AfterViewInit {

  get interfaces() {
    return this.form.get('interfaces') as FormArray;
  }

  get roles() {
    return this.form.get('roles') as FormArray;
  }

  @Input()
  serviceTemplate?: EntityModel = new EntityModel( '' , ServiceTemplate.create());

  @Input()
  damId?: string;

  form: FormGroup;
  targetAdapters: object;
  requirements: object;
  itemFormats: Array<string> = [];

  constructor( private formBuilder: FormBuilder,
               private changeDetector: ChangeDetectorRef,
               private serviceDefinitionService: ServiceDefinitionService) {
    this.form = this.buildServiceTemplateForm();
  }

  ngOnInit() {
    this.serviceDefinitionService.getTargetAdapters(this.damId).subscribe(targetAdapters => {
      this.targetAdapters = this.formatTargetAdapters(targetAdapters);
      this.targetAdapterChange();
    });
    this.form = this.buildServiceTemplateForm();
  }

  buildServiceTemplateForm() {
    const { name, dto } = this.serviceTemplate;
    return this.formBuilder.group({
      id: [name, [Validators.pattern(nameConstraintPattern),
        Validators.required]],
      targetAdapter: [dto.targetAdapter, [Validators.required]],
      itemFormat: [dto.itemFormat, [Validators.required]],
      interfaces: this.formBuilder.array([]),
      roles: this.formBuilder.array([]),
      ui: this.formBuilder.group({
        label: [dto.ui.label, [Validators.required]],
        description: [dto.ui.description, [Validators.required]],
      }),
    });
  }

  ngAfterViewInit(): void {
    const roles = _get(this.serviceTemplate, 'dto.roles', {});
    const interfaces = _get(this.serviceTemplate, 'dto.interfaces', {});
    this.updateRolesForm(roles);
    this.updateInterfacesForm(interfaces);
    this.changeDetector.detectChanges();
  }

  addRole(roleId?: string, roles?): void {
    // TODO: Refactor
    if (!roles) {
      const { name, dto } = new EntityModel( '' , ServiceRole.create());
      this.roles.insert(0, this.createRoleForm(name, dto));
    } else {
      const {name, dto} = new EntityModel(roleId, _get(roles, roleId, null));
      this.roles.insert(0, this.createRoleForm(name, dto));
    }
  }

  removeRole(index: number): void {
    this.roles.removeAt(index);
  }

  addInterface(interfaceType?, interfaces?) {
    // TODO: Refactor
    if (!interfaces) {
      this.interfaces.insert(0, this.createInterfacesForm('', ''));
    } else {
      const {name, dto} = new EntityModel(interfaceType, _get(interfaces, interfaceType, null));
      this.interfaces.insert(0, this.createInterfacesForm(name, dto));
    }
  }

  removeInterface(index: number) {
    this.interfaces.removeAt(index);
  }

  getModel(): EntityModel {
    const {
      id,
      interfaces,
      itemFormat,
      roles,
      targetAdapter,
      ui,
    } = this.form.value;
    return new EntityModel(id, {
      interfaces: this.formatInterfaces(interfaces),
      itemFormat,
      roles: this.formatRoles(roles),
      targetAdapter,
      ui,
    });
  }

  targetAdapterChange() {
    const selectedTargetAdapter: string = this.form.get('targetAdapter').value || '';
    if (selectedTargetAdapter) {
      this.itemFormats = this.targetAdapters[selectedTargetAdapter].itemFormats;
      this.requirements = this.targetAdapters[selectedTargetAdapter].requirements;
    }
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

  private createRoleForm(name, dto): FormGroup {
    return this.formBuilder.group({
      name: [name, []],
      targetRoles: [dto.targetRoles, []],
      targetScopes: [dto.targetScopes, []],
      damRoleCategories: [dto.damRoleCategories, []],
      ui: this.formBuilder.group({
        label: [ dto.ui.label, [Validators.required]],
        description: [dto.ui.description, [Validators.required]],
      }),
    });
  }

  private createInterfacesForm(name, dto): FormGroup {
    return this.formBuilder.group({
      type: [name],
      value: [dto],
    });
  }


  private updateRolesForm(roles: any) {
    if (!roles) {
      return;
    }
    Object.keys(roles).forEach(roleId => this.addRole(roleId, roles));
  }

  private updateInterfacesForm(interfaces: any) {
    if (!interfaces) {
      return;
    }
    Object.keys(interfaces).forEach(interfaceType => this.addInterface(interfaceType, interfaces));
  }

  private formatInterfaces(interfaces) {
    // TODO: Refactor
    const modifiedInterfaces = {};
    interfaces.forEach(interfaceObj => {
      if (!modifiedInterfaces.hasOwnProperty(interfaceObj.type)) {
        modifiedInterfaces[interfaceObj.type] = '';
      }
      modifiedInterfaces[interfaceObj.type] = interfaceObj.value;
    });
    return modifiedInterfaces;
  }

  private formatRoles(roles) {
    // TODO: Refactor
    const modifiedRoles = {};
    const roleObj = {
      targetRoles: [],
      targetScopes: [],
      damRoleCategories: [],
      ui: {
        label: '',
        description: '',
      },
    };
    roles.forEach(role => {
      modifiedRoles[role.name] = Object.keys(roleObj)
        .reduce((a, key) => ({ ...a, [key]: role[key]}), {});
    });
    return modifiedRoles;
  }

  private formatTargetAdapters(targetAdapters: Object) {
    const modifiedTargetAdapters = {};
    for (const targetAdapter in targetAdapters) {
      modifiedTargetAdapters[targetAdapter] = {};
      modifiedTargetAdapters[targetAdapter]['itemFormats'] = Object.keys(targetAdapters[targetAdapter].itemFormats);
      modifiedTargetAdapters[targetAdapter]['requirements'] = targetAdapters[targetAdapter].requirements;
    }
    return modifiedTargetAdapters;
  }
}
