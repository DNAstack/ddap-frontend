import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, EmbeddedViewRef, Input, OnDestroy,
  OnInit,
  QueryList, TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';

import { dam } from '../../../shared/proto/dam-service';
import { EntityModel, nameConstraintPattern } from '../../shared/entity.model';

import Resource = dam.v1.Resource;
import { ResourceViewFormComponent } from './resource-view-form/resource-view-form.component';

@Component({
  selector: 'ddap-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss'],
  entryComponents: [ResourceViewFormComponent],
})
export class ResourceFormComponent implements OnInit, OnDestroy, AfterViewInit {

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
        imageUrl: [dto.ui.imageUrl || '', []], // TODO: url validator
        infoUrl: [dto.ui.infoUrl || '', []], // TODO: url validator
      }),
    });
  }

  ngOnDestroy(): void {
    // this.viewRefs.forEach((view) => view.destroy());
    // this.form.reset();
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
