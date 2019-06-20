import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import Resource = dam.v1.Resource;

import { dam } from '../../../shared/proto/dam-service';
import { FormValidators } from '../../../shared/validators';
import { EntityModel, nameConstraintPattern } from '../../shared/entity.model';
import Form from '../../shared/form';

import { ResourceViewFormComponent } from './resource-view-form/resource-view-form.component';

@Component({
  selector: 'ddap-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss'],
  entryComponents: [ResourceViewFormComponent],
})
export class ResourceFormComponent implements OnInit, AfterViewInit, Form {

  @Input()
  resource?: EntityModel = new EntityModel('', Resource.create());

  form: FormGroup;

  viewRefs: EmbeddedViewRef<ResourceViewFormComponent>[] = [];
  @ViewChild('viewTemplate')
  viewTemplateRef: TemplateRef<any>;
  @ViewChild('views', { read: ViewContainerRef })
  container: ViewContainerRef;
  @ViewChildren(ResourceViewFormComponent)
  viewChildComponents: QueryList<ResourceViewFormComponent>;

  constructor(private formBuilder: FormBuilder,
              private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef) {
  }

  get views() {
    return _get(this.resource, 'dto.views', {});
  }

  ngOnInit(): void {
    const { name, dto } = this.resource;

    this.form = this.formBuilder.group({
      id: [name, [Validators.pattern(nameConstraintPattern)]],
      maxTokenTtl: [dto.maxTokenTtl, []],
      ui: this.formBuilder.group({
        access: [dto.ui.access, []],
        description: [dto.ui.description, [Validators.required, Validators.maxLength(255)]],
        label: [dto.ui.label, [Validators.required]],
        owner: [dto.ui.owner, []],
        size: [dto.ui.size, []],
        year: [dto.ui.year, []],
        tags: [dto.ui.tags, []],
        applyUrl: [dto.ui.applyUrl, [FormValidators.url]],
        troubleshootUrl: [dto.ui.troubleshootUrl, [FormValidators.url]],
        imageUrl: [dto.ui.imageUrl, [FormValidators.url]],
        infoUrl: [dto.ui.infoUrl, [FormValidators.url]],
      }),
    });
  }

  ngAfterViewInit(): void {
    if (!this.views) {
      return;
    }
    Object.keys(this.views).forEach((viewId) => this.addView(viewId));
    this.cd.detectChanges();
  }

  addView(viewId?: string) {
    const view = new EntityModel(viewId,  _get(this.views, viewId, null));
    const _id = new Date().getTime().toString();
    this.viewRefs.push(this.container.createEmbeddedView(
      this.viewTemplateRef,
      { $implicit: { ...view, _id } },
      0
    ));
  }

  removeView({ _id }: any) {
    const embeddedView = this.viewRefs.find((component) => component.context['$implicit']._id === _id);
    embeddedView.destroy();
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
    const vars = this.getVariables(viewForm);

    return {
      [id]: {
        items: [{ vars }],
        roles: this.sanitizeRoles(roles),
        ...rest,
      },
    };
  }

  getVariables(viewForm: FormGroup) {
    const { variables } = viewForm.value;
    if (!variables) {
      return {};
    }

    return variables.map((variable) => {
      return {
        [variable.name]: variable.value,
      };
    }).reduce((previousValue, currentValue) => {
      return Object.assign(previousValue, currentValue);
    }, {});
  }

  isValid() {
    return this.form.valid && this.viewChildComponents
      .map((viewComponent) => viewComponent.viewForm.valid)
      .every((valid => valid === true));
  }

  getAllForms(): FormGroup[] {
    return [...this.getViewChildrenForms(), this.form];
  }

  private getViewChildrenForms(): FormGroup[] {
    if (!this.viewChildComponents) {
      return [];
    }
    return this.viewChildComponents.map(view => view.viewForm);
  }

  private sanitizeRoles(roles) {
    if (!roles) {
      return {};
    }

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
