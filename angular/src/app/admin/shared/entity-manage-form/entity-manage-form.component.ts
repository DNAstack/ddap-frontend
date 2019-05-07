import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigModificationObject } from '../configModificationObject';
import { nameConstraintPattern } from '../entity.model';

@Component({
  selector: 'ddap-entity-manage-form',
  templateUrl: './entity-manage-form.component.html',
  styleUrls: ['./entity-manage-form.component.scss'],
})
export class EntityManageFormComponent implements OnInit {

  @Input()
  label: string;

  @Output()
  submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', [
        Validators.pattern(nameConstraintPattern),
      ]],
      dto: ['{}', [
        Validators.required,
      ]],
    });
  }

  submitChange() {
    const { id, dto } = this.form.value;
    const change = new ConfigModificationObject(JSON.parse(dto), {});

    this.submitted.emit({ id, change });
  }

}
