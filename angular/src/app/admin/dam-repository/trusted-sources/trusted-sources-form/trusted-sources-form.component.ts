import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import TrustedSource = dam.v1.TrustedSource;
import { Form } from 'ddap-common-lib';
import { EntityModel, nameConstraintPattern } from 'ddap-common-lib';
import _get from 'lodash.get';

import { dam } from '../../../../shared/proto/dam-service';

@Component({
  selector: 'ddap-trusted-sources-form',
  templateUrl: './trusted-sources-form.component.html',
  styleUrls: ['./trusted-sources-form.component.scss'],
})
export class TrustedSourcesFormComponent implements OnChanges, OnDestroy, Form {

  get sources() {
    return this.form.get('sources') as FormArray;
  }

  get claims() {
    return this.form.get('claims') as FormArray;
  }

  @Input()
  trustedSource?: TrustedSource = TrustedSource.create({});

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.buildForm(null, this.trustedSource);
  }

  ngOnChanges({trustedSource}: SimpleChanges): void {
    const sourceId: string = _get(trustedSource, 'currentValue.name', '');
    const sourceDto: TrustedSource = _get(trustedSource, 'currentValue.dto', TrustedSource.create({}));

    this.form = this.buildForm(sourceId, sourceDto);
  }

  ngOnDestroy(): void {
  }

  addSource(): void {
    this.sources.insert(
      0, this.formBuilder.control('')
    );
  }

  removeSource(index: number): void {
    this.sources.removeAt(index);
  }

  addClaim(): void {
    this.claims.insert(
      0, this.formBuilder.control('')
    );
  }

  removeClaim(index: number): void {
    this.claims.removeAt(index);
  }

  getModel(): EntityModel {
    const {id, sources, claims, ui} = this.form.value;
    const trustedSources = TrustedSource.create({
      claims,
      sources,
      ui,
    });

    return new EntityModel(id, trustedSources);
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

  private buildForm(sourceId: string, {ui, sources, claims}: TrustedSource) {
    const sourcesForm = this.formBuilder.array(sources || []);
    const claimsForm = this.formBuilder.array(claims || []);

    return this.formBuilder.group({
        id: [{value: sourceId, disabled: !!sourceId}, [Validators.pattern(nameConstraintPattern)]],
        ui: this.formBuilder.group({
          label: [_get(ui, 'label'), [Validators.required]],
          description: [_get(ui, 'description', ''), [Validators.required, Validators.maxLength(255)]],
        }),
        sources: sourcesForm,
        claims: claimsForm,
      }
    );
  }
}
