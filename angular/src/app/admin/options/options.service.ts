import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AbstractConfigOptionService } from '../shared/config-option.service';

@Injectable({
  providedIn: 'root',
})
export class OptionService extends AbstractConfigOptionService {

  constructor(http: HttpClient) {
    super(http, environment.damApiUrl);

  }

}
