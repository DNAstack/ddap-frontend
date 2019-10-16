import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { makeDistinct, pick } from '../../../../../shared/autocomplete/autocomplete.util';
import { PassportVisa } from '../../../../../shared/passport-visa/passport-visa.constant';
import { ClaimDefinitionsStore } from '../../../claim-definitions/claim-definitions.store';
import ConditionPrefix = PassportVisa.ConditionPrefix;
import AuthorityLevel = PassportVisa.AuthorityLevel;
import { PersonaFormBuilder } from '../persona-form-builder.service';

@Component({
  selector: 'ddap-passport-conditions-form',
  templateUrl: './passport-conditions-form.component.html',
  styleUrls: ['./passport-conditions-form.component.scss'],
})
export class PassportConditionsFormComponent implements OnInit {

  @Input()
  form: FormGroup;
  @Input()
  damId: string;

  passportVisaTypes$: Observable<string[]>;
  authorityLevels: string[] = Object.values(AuthorityLevel);
  prefixes: string[] = Object.values(ConditionPrefix);

  get conditions() {
    return this.form.get('conditions') as FormArray;
  }

  constructor(private personaFormBuilder: PersonaFormBuilder,
              private claimDefinitionsStore: ClaimDefinitionsStore) {
  }

  ngOnInit(): void {
    this.passportVisaTypes$ = this.claimDefinitionsStore.getAsList(this.damId, pick('name'))
      .pipe(
        map(makeDistinct)
      );
  }

  getClauses(condition: AbstractControl) {
    return condition.get('clauses') as FormArray;
  }

  addCondition() {
    this.conditions.insert(0, this.personaFormBuilder.buildConditionForm());
  }

  removeCondition(index: number) {
    this.conditions.removeAt(index);
  }

  addClauseCondition(condition: AbstractControl) {
    this.getClauses(condition).push(this.personaFormBuilder.buildClauseConditionForm());
  }

  removeClauseCondition(condition: AbstractControl, clauseIndex: number, conditionIndex: number) {
    this.getClauses(condition).removeAt(clauseIndex);
    if (this.getClauses(condition).length < 1) {
      this.removeCondition(conditionIndex);
    }
  }

}
