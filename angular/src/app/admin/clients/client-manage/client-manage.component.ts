import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
})
export class ClientManageComponent {

  client: any = {};

  constructor(private clientService: ClientService, private router: Router, private realmService: RealmService) { }

  onSubmit(value: any) {
    this.clientService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/clients')))
      .subscribe(path => this.router.navigate([path]));
  }
}
