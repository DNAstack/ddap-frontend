import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityModel } from 'ddap-common-lib';
import { zip } from 'rxjs';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { DamInfoService } from '../../shared/dam/dam-info.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { DataService } from '../data.service';


@Component({
  selector: 'ddap-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  providers: [ImagePlaceholderRetriever],
})
export class DataListComponent implements OnInit {

  qualifiedResources$: Observable<{damId: string, entity: EntityModel}[]>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public randomImageRetriever: ImagePlaceholderRetriever,
    private damInfoService: DamInfoService
  ) {
  }

  ngOnInit() {
    // FIXME I think this should be a piped Observable and not a subscription
    // Needed to reload the data every time the realm in the URL changes (conditionIndex.e. using the realm selector)
    this.route.parent.params.subscribe(() => {
      this.qualifiedResources$ =
        this.damInfoService.getDamUrls()
          .pipe(
            flatMap(damApiUrls => {
              const damIds: string[] = Array.from(damApiUrls.keys());
              const unzippedQualifiedModels: Observable<{ damId: string, entity: EntityModel }[]>[] =
                damIds.map(damId =>
                  this.dataService.get(damId)
                    .pipe(map((ems: EntityModel[]) => ems.map(DataListComponent.qualifier(damId)))));

              // Need to pass in all args separately, not as array
              return zip(...unzippedQualifiedModels)
                .pipe(
                  map(DataListComponent.flatten)
                );
            })
          );
    });
  }

  private static qualifier(damId: string): (em: EntityModel) => { damId: string, entity: EntityModel } {
    return em => {
      return {
        damId: damId,
        entity: em,
      };
    };
  }

  private static flatten<T>(arrayOfArrays: T[][]): T[] {
    return arrayOfArrays.reduce((accum, cur) => accum.concat(...cur), []);
  }

}
