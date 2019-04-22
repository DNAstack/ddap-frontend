import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import _get from 'lodash/get';

import { IdentityService } from '../identity/identity.service';
import { Profile } from '../identity/profile.model';

@Component({
  templateUrl: './realm.component.html',
  styleUrls: ['./realm.component.scss'],
})
export class RealmComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.form = this.formBuilder.group({
        id: [params.realmId, [Validators.required, Validators.min(3)]],
      });
    });
  }

  changeRealmAndGoToLogin() {
    const { id } = this.form.value;
    window.location.href = `/api/v1alpha/${id}/identity/login`;
  }
}
