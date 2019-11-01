import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'ddap-common-lib';
import IAssertion = common.IAssertion;
import ICondition = common.Assertion.ICondition;
import IConditionClause = common.Assertion.IConditionClause;
import { EntityModel, nameConstraintPattern } from 'ddap-common-lib';
import _get from 'lodash.get';

import { common } from '../../../../shared/proto/dam-service';
import { PassportVisaValidators } from '../../shared/passport-visa/passport-visa-validators';

@Injectable({
  providedIn: 'root',
})
export class PersonaFormBuilder {

  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(persona?: EntityModel): FormGroup {
    return this.formBuilder.group({
      id: [_get(persona, 'name'), [Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [_get(persona, 'dto.ui.label'), [Validators.required]],
      }),
      passport: this.formBuilder.group({
        standardClaims: this.formBuilder.group({
          iss: [_get(persona, 'dto.passport.standardClaims.iss'), Validators.required],
          email: [_get(persona, 'dto.passport.standardClaims.email'), Validators.required],
          picture: [_get(persona, 'dto.passport.standardClaims.picture'), FormValidators.url],
        }),
        ga4ghAssertions: this.buildGa4ghAssertionsForm(_get(persona, 'dto.passport.ga4ghAssertions')),
      }),
    });
  }

  buildGa4ghAssertionsForm(ga4ghAssertions?: IAssertion[]): FormArray {
    return this.formBuilder.array(ga4ghAssertions
      ? ga4ghAssertions.map((assertion: common.IAssertion) => this.buildGa4ghAssertionForm(assertion))
      : []
    );
  }

  buildGa4ghAssertionForm(ga4fhAssertion?: IAssertion): FormGroup {
    return this.formBuilder.group({
      type: [_get(ga4fhAssertion, 'type'), [Validators.required]],
      source: [_get(ga4fhAssertion, 'source'), [Validators.required, FormValidators.url]],
      value: [_get(ga4fhAssertion, 'value'), [Validators.required]],
      assertedDuration: [_get(ga4fhAssertion, 'assertedDuration'), [Validators.required, FormValidators.duration]],
      expiresDuration: [_get(ga4fhAssertion, 'expiresDuration'), [Validators.required, FormValidators.duration]],
      by: [_get(ga4fhAssertion, 'by')],
      conditions: this.buildConditionsForm(_get(ga4fhAssertion, 'conditions')),
    });
  }

  buildConditionsForm(conditions?: ICondition[]): FormArray {
    return this.formBuilder.array(conditions ? conditions.map((condition) => {
      return this.formBuilder.group({
        clauses: this.formBuilder.array(condition.clauses.map((conditionClause: IConditionClause) => {
          return this.formBuilder.group({
            type: [conditionClause.type, [Validators.required]],
            source: [conditionClause.source, [PassportVisaValidators.hasPrefix]],
            value: [conditionClause.value, [PassportVisaValidators.hasPrefix]],
            by: [conditionClause.by, [PassportVisaValidators.hasPrefix]],
          });
        })),
      });
    }) : []);
  }

  buildConditionForm(): FormGroup {
    return this.formBuilder.group({
      clauses: this.formBuilder.array([this.buildClauseConditionForm()]),
    });
  }

  buildClauseConditionForm(clause?: IConditionClause): FormGroup {
    return this.formBuilder.group({
      type: [_get(clause, 'type'), [Validators.required]],
      source: [_get(clause, 'source')],
      value: [_get(clause, 'value')],
      by: [_get(clause, 'by')],
    });
  }

}


