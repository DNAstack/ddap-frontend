import { Component, OnInit } from '@angular/core';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss']
})
export class ClientManageComponent implements OnInit {

  resource: any = {};

  constructor(private resourceService: ClientService) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.resourceService.save(JSON.parse(value.body))
      .subscribe(() => this.resource = {});
  }
}
