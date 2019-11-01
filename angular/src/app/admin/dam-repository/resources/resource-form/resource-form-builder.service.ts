import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'ddap-common-lib';
import { EntityModel, nameConstraintPattern } from 'ddap-common-lib';
import _get from 'lodash.get';

@Injectable({
  providedIn: 'root',
})
export class ResourceFormBuilder {

  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(resource?: EntityModel): FormGroup {
    return this.formBuilder.group({
      id: [_get(resource, 'name'), [Validators.pattern(nameConstraintPattern)]],
      maxTokenTtl: [_get(resource, 'maxTokenTtl')],
      ui: this.formBuilder.group({
        label: [_get(resource, 'dto.ui.label'), [Validators.required]],
        description: [_get(resource, 'dto.ui.description'), [Validators.required, Validators.maxLength(255)]],
        access: [_get(resource, 'dto.ui.access')],
        owner: [_get(resource, 'dto.ui.owner')],
        size: [_get(resource, 'dto.ui.size')],
        year: [_get(resource, 'dto.ui.year')],
        tags: [_get(resource, 'dto.ui.tags')],
        applyUrl: [_get(resource, 'dto.ui.applyUrl'), [FormValidators.url]],
        troubleshootUrl: [_get(resource, 'dto.ui.troubleshootUrl'), [FormValidators.url]],
        imageUrl: [_get(resource, 'dto.ui.imageUrl'), [FormValidators.url]],
        infoUrl: [_get(resource, 'dto.ui.infoUrl'), [FormValidators.url]],
      }),
    });
  }

  buildViewForm(view?: EntityModel): FormGroup {
    return this.formBuilder.group({
      id: [_get(view, 'name'), [Validators.pattern(nameConstraintPattern)]],
      serviceTemplate: [_get(view, 'dto.serviceTemplate'), [Validators.required]],
      defaultRole: [_get(view, 'dto.defaultRole'), [Validators.required]],
      version: [_get(view, 'dto.version'), [Validators.required]],
      topic: [_get(view, 'dto.topic')],
      partition: [_get(view, 'dto.partition')],
      fidelity: [_get(view, 'dto.fidelity')],
      geoLocation: [_get(view, 'dto.geoLocation')],
      aud: [_get(view, 'dto.aud')],
      contentTypes: [_get(view, 'dto.contentTypes')],
      ui: this.formBuilder.group({
        label: [_get(view, 'dto.ui.label'), [Validators.required]],
        description: [_get(view, 'dto.ui.description'), [Validators.required, Validators.maxLength(255)]],
      }),
    });
  }

}


