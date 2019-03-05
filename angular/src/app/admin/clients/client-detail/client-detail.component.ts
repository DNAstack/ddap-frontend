import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {

  client: any;

  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public realmService: RealmService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getClient(params['clientName']))
    ).subscribe(client => this.client = client);
  }

  private getClient(clientName) {
    return this.clientService.get()
      .pipe(
        pluck(clientName)
      );
  }
}
