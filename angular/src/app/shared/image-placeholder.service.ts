import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagePlaceholderRetriever {

  imageNamePrefix = 'placeholder_pattern';

  getPathToFixedRandomImage(string: string): string {
    const i = string ? string.length % 4 : 0;
    return `/assets/images/${this.imageNamePrefix}_${i + 1}.jpg`;
  }

}
