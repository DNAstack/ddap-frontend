import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  clients$: Observable<any[]>;

  constructor(private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.clients$ = this.clientService.get(this.routeDamId())
      .pipe(map(EntityModel.arrayFromMap));
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
