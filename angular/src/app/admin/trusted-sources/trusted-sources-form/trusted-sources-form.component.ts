import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';

import { dam } from '../../../shared/proto/dam-service';
import { EntityModel, nameConstraintPattern } from '../../shared/entity.model';
import TrustedSource = dam.v1.TrustedSource;

@Component({
  selector: 'ddap-trusted-sources-form',
  templateUrl: './trusted-sources-form.component.html',
  styleUrls: ['./trusted-sources-form.component.scss'],
})
export class TrustedSourcesFormComponent implements OnChanges, OnDestroy {

  @Input()
  trustedSource?: TrustedSource = TrustedSource.create({});

  form: FormGroup;

  get sources() {
    return this.form.get('sources') as FormArray;
  }

  get claims() {
    return this.form.get('claims') as FormArray;
  }

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
    const {id, sources, claims, label, description} = this.form.value;
    const trustedSources = TrustedSource.create({
      claims,
      sources,
      ui: {
        label,
        description,
      },
    });

    return new EntityModel(id, trustedSources);
  }

  private buildForm(sourceId: string, {ui, sources, claims}: TrustedSource) {
    const sourcesForm = this.formBuilder.array(sources || []);
    const claimsForm = this.formBuilder.array(claims || []);

    return this.formBuilder.group({
        id: [{value: sourceId, disabled: !!sourceId}, [
          Validators.pattern(nameConstraintPattern),
        ]],
        label: [_get(ui, 'label')],
        description: [_get(ui, 'description')],
        sources: sourcesForm,
        claims: claimsForm,
      }
    );
  }
}
