import IConditionClause = dam.v1.TestPersona.TestAssertion.IConditionClause;
import ICondition = dam.v1.TestPersona.TestAssertion.ICondition;
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';

import { FormValidators } from '../../../../shared/form/validators';
import { dam } from '../../../../shared/proto/dam-service';
import TestPersona = dam.v1.TestPersona;
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';

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

  buildGa4ghAssertionsForm(ga4ghAssertions?: TestPersona.ITestAssertion[]): FormArray {
    return this.formBuilder.array(ga4ghAssertions
      ? ga4ghAssertions.map((assertion: TestPersona.ITestAssertion) => this.buildGa4ghAssertionForm(assertion))
      : []
    );
  }

  buildGa4ghAssertionForm(ga4fhAssertion?: TestPersona.ITestAssertion): FormGroup {
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
            source: [conditionClause.source],
            value: [conditionClause.value],
            by: [conditionClause.by],
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


