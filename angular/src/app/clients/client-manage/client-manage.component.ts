import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../client.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
})
export class ClientManageComponent implements OnInit {

  client: any = {};

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.clientService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/clients']));
  }
}
