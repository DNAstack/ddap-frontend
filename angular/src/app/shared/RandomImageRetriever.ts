import { Injectable } from '@angular/core';

@Injectable()
export class ImagePlaceholderRetriever {

  imageNamePrefix = 'placeholder_pattern';

  getPathToFixedRandomImage(string: string): string {
    const i = string ? string.length % 4 : 1;

    return `/assets/images/${this.imageNamePrefix}_${i}.jpg`;
  }

}
