import { Pipe, PipeTransform } from '@angular/core';

import { EntityModel } from '../admin/shared/entity.model';

@Pipe({name: 'asEntityModel'})
export class AsEntityModelPipe implements PipeTransform {

  transform(input: [{ [key: string]: string }]): EntityModel[] {
    if (!input) {
      return null;
    }

    return EntityModel.arrayFromMap(EntityModel.objectToMap(input));
  }

}
