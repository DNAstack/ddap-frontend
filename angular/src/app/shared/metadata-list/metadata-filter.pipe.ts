import { Pipe, PipeTransform } from '@angular/core';

export const nonMetadataFields = [
  'imageUrl', 'label', 'owner', 'description',
];

export const metadataTranslations = {
  applyUrl: 'Apply',
  infoUrl: 'Information',
  troubleshootUrl: 'Help',
};

@Pipe({name: 'metadataFilter'})
export class MetadataFilterPipe implements PipeTransform {

  transform(input: [{ [key: string]: string }], includeFields: string[]) {
    if (!input) {
      return null;
    }

    return input
      .filter((keyvalue) => this.shouldBeIncluded(keyvalue.key, includeFields))
      .map((keyvalue) => {
        if (keyvalue.key in metadataTranslations) {
          keyvalue.key = metadataTranslations[keyvalue.key];
        }
        return keyvalue;
      });
  }

  shouldBeIncluded = (fieldKey: string, includeFields: string[]) =>
    (includeFields && includeFields.includes(fieldKey)) || !nonMetadataFields.includes(fieldKey)

}
