import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
})
export class ClientManageComponent {

  constructor(private clientService: ClientService,
              private router: Router) { }

  onSubmit(value: any) {
    this.clientService.save(JSON.parse(value.body))
      .subscribe(path => this.router.navigate([path]));
  }
}
