import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../admin/shared/entity.model';
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
    public randomImageRetriever: ImagePlaceholderRetriever
  ) {
  }

  ngOnInit() {
    // Needed to reload the data every time the realm in the URL changes (i.e. using the realm selector)
    this.route.parent.params.subscribe(() => {
      // FIXME need to pull id from params
      const damId = '1';
      const qualify: (em: EntityModel) => { damId: string, entity: EntityModel } = (em: EntityModel) => {
        return {
          damId: '1',
          entity: em,
        };
      };
      this.qualifiedResources$ =
        this.dataService.get(damId)
          .pipe(
            map((ems: EntityModel[]) => ems.map(qualify))
          );
    });
  }

}
