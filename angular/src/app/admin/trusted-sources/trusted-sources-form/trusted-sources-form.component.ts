import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { dam } from '../../../shared/proto/dam-service';
import { EntityModel } from '../../shared/entity.model';
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
    this.form = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

  addSource(): void {
    this.sources.insert(
      0, this.formBuilder.group({'source': ['']})
    );
  }

  removeSource(index: number): void {
    this.sources.removeAt(index);
  }

  addClaim(): void {
    this.claims.insert(
      0, this.formBuilder.group({'claim': ['']})
    );
  }

  removeClaim(index: number): void {
    this.claims.removeAt(index);
  }

  getModel(): EntityModel {
    const { id, sources, claims, label, description } = this.form.value;
    const trustedSources = TrustedSource.create({
      claims: claims.map((claim) => claim.claim),
      sources: sources.map((source) => source.source),
      ui: {
        label,
        description,
      },
    });

    return new EntityModel(id, trustedSources);
  }

  private buildForm() {
    return this.formBuilder.group({
        id: [''],
        label: [''],
        description: [''],
        sources: this.formBuilder.array([]),
        claims: this.formBuilder.array([]),
      }
    );
  }
}
