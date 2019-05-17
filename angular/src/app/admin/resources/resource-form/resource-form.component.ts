import {
  Component,
  ComponentFactoryResolver, ComponentRef, Input, OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { sanitizeHtml } from '@angular/core/src/sanitization/sanitization';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { dam } from '../../../shared/proto/dam-service';
import { EntityModel, nameConstraintPattern } from '../../shared/entity.model';
import { ResourceService } from '../resources.service';

import Resource = dam.v1.Resource;
import { ResourceViewFormComponent } from './resource-view-form/resource-view-form.component';

@Component({
  selector: 'ddap-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss'],
  entryComponents: [ResourceViewFormComponent],
})
export class ResourceFormComponent implements OnInit, OnDestroy {

  @Input()
  resource?: EntityModel = new EntityModel('', Resource.create());

  form: FormGroup;
  viewRefs: ComponentRef<ResourceViewFormComponent>[] = [];

  @ViewChild('views', { read: ViewContainerRef })
  container: ViewContainerRef;
  @ViewChildren(ResourceViewFormComponent)
  viewChildComponents: QueryList<ResourceViewFormComponent>;

  constructor(private formBuilder: FormBuilder,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    const { name, dto } = this.resource;

    this.form = this.formBuilder.group({
      id: [name || '', [Validators.pattern(nameConstraintPattern)]],
      maxTokenTtl: [dto.maxTokenTtl || '', [Validators.required]],
      ui: this.formBuilder.group({
        access: [dto.ui.access || '', []],
        description: [dto.ui.description || '', [Validators.required, Validators.maxLength(255)]],
        label: [dto.ui.label || '', [Validators.required]],
        owner: [dto.ui.owner || '', [Validators.required]],
        size: [dto.ui.size || '', []],
        year: [dto.ui.year || '', []],
        tags: [dto.ui.tags || '', []],
        applyUrl: [dto.ui.applyUrl || '', []], // TODO: url validator
        troubleshootUrl: [dto.ui.troubleshootUrl || '', []], // TODO: url validator
        imageUrl: [dto.ui.imageUrl || '', [Validators.required]], // TODO: url validator
        infoUrl: [dto.ui.infoUrl || '', []], // TODO: url validator
      }),
    });
  }

  ngOnDestroy(): void {
    // this.viewRefs.forEach((view) => view.destroy());
    this.form.reset();
  }

  addView() {
    const view = this.componentFactoryResolver.resolveComponentFactory(ResourceViewFormComponent);
    this.viewRefs.push(this.container.createComponent(view));
  }

  getModel(): EntityModel {
    const views: any = this.getViewChildrenForms()
      .map(view => this.getViewModel(view))
      .reduce((previousValue, currentValue) => {
        return Object.assign(previousValue, currentValue);
      }, {});

    const { id, ui, maxTokenTtl } = this.form.value;
    const resource = {
      maxTokenTtl,
      ui,
      views,
    };

    return new EntityModel(id, resource);
  }

  getViewModel(viewForm: FormGroup) {
    const { id, variables, roles, ...rest } = viewForm.value;
    const vars: any[] = variables.map((variable) => {
      return {
        [variable.name]: variable.value,
      };
    }).reduce((previousValue, currentValue) => {
      return Object.assign(previousValue, currentValue);
    }, {});

    return {
      [id]: {
        items: [{ vars }],
        roles: this.sanitizeRoles(roles),
        ...rest,
      },
    };
  }

  private getViewChildrenForms(): FormGroup[] {
    if (!this.viewChildComponents.length) {
      return this.viewRefs.map(view => view.instance.viewForm);
    }
    return this.viewChildComponents.map(view => view.viewForm);
  }

  private sanitizeRoles(roles) {
    const emptyRoles = Object.entries(roles)
      .filter(([_, value]: any) => {
        return value.policies.length < 1;
      }).map(([key, _]: any) => {
        return key;
      });

    emptyRoles.forEach((role) => delete roles[role]);

    return roles;
  }

}
