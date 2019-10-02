import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
  damId: string;

  form: FormGroup;
  targetAdapters: object;
  requirements: object;
  itemFormats: string[];

  constructor( private formBuilder: FormBuilder,
               private serviceDefinitionService: ServiceDefinitionService) {
    this.form = this.buildServiceTemplateForm();
  }

  ngOnInit() {
    this.serviceDefinitionService.getTargetAdapters(this.damId).subscribe(targetAdapters => {
      this.targetAdapters = targetAdapters;
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
        description: [dto.ui.description, [Validators.required, Validators.maxLength(255)]],
      }),
    });
  }

  ngAfterViewInit(): void {
    const roles = _get(this.serviceTemplate, 'dto.roles', {});
    const interfaces = _get(this.serviceTemplate, 'dto.interfaces', {});
    this.updateRolesForm(roles);
    this.updateInterfacesForm(interfaces);
  }

  addRole(roleId?: string, roles?): void {
    const {name, dto} = new EntityModel(
      roleId ? roleId : '',
      roles ? _get(roles, roleId, null) : ServiceRole.create()
    );
    this.roles.insert(0, this.createRoleForm(name, dto));
  }

  removeRole(index: number): void {
    this.roles.removeAt(index);
  }

  addInterface(interfaceType?, interfaces?) {
    const {name, dto} = new EntityModel(
      interfaceType ? interfaceType : '',
      interfaces ? _get(interfaces, interfaceType, null) : ''
    );
    this.interfaces.insert(0, this.createInterfacesForm(name, dto));
  }

  removeInterface(index: number) {
    this.interfaces.removeAt(index);
  }

  getModel(): EntityModel {
    const {
      id,
      interfaces,
      roles,
      ...rest
    } = this.form.value;
    return new EntityModel(id, {
      interfaces: this.getInterfacesModel(interfaces),
      roles: this.getRolesModel(roles),
      ...rest,
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
      name: [name, [Validators.pattern(nameConstraintPattern), Validators.required]],
      targetRoles: [dto.targetRoles, []],
      targetScopes: [dto.targetScopes, []],
      damRoleCategories: [dto.damRoleCategories, []],
      ui: this.formBuilder.group({
        label: [ dto.ui.label, [Validators.required]],
        description: [dto.ui.description, [Validators.required, Validators.maxLength(255)]],
      }),
    });
  }

  private createInterfacesForm(name = '', dto= ''): FormGroup {
    return this.formBuilder.group({
      name: [name, [Validators.required]],
      value: [dto, [Validators.required]],
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

  private getInterfacesModel(interfaces) {
    const modifiedInterfaces = {};
    interfaces.forEach(interfaceObj =>
      modifiedInterfaces[interfaceObj.name] = interfaceObj.value
    );
    return modifiedInterfaces;
  }

  private getRolesModel(roles) {

    const rolesModel: object = {};
    roles.map(role => {
      const { name } = role;
      delete role.name;
      Object.assign(rolesModel, { [name] : ServiceRole.create(role) });
    });
    return rolesModel;
  }
}
