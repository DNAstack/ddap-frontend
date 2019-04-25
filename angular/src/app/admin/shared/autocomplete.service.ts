import {EntityService} from "./entity.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityModel} from "./entity.model";
import {ConfigModel} from "./config.model";
import {environment} from "../../../environments/environment";
import {realmIdPlaceholder} from "../../shared/realm/realm.constant";
import {map, pluck} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {

  constructor(protected http: HttpClient) {
  }

  public getClaimDefinitionSuggestions(claimName: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/autocomplete/claimValue?claimName=${claimName}`, {});
  }
}
