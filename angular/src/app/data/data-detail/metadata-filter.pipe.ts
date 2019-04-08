import { Pipe, PipeTransform } from '@angular/core';

import { nonMetadataFields } from './data-detail.constants';

export const nonMetadataFields = [
  'imageUrl', 'applyUrl', 'infoUrl', 'label', 'owner', 'troubleshootUrl', 'description',
];

@Pipe({name: 'metadataFilter'})
export class MetadataFilterPipe implements PipeTransform {

  transform(input: [{ [key: string]: string }]) {
    if (!input) {
      return null;
    }
    return input.filter((keyvalue) => !nonMetadataFields.includes(keyvalue.key));
  }
}
