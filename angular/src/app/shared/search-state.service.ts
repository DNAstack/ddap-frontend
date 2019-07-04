import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {

  public limitSearch = false;
  public backLink: string;
  public resource: string;
  public damId: string;

}
