import { AfterViewInit, Component, Input, Renderer2, ViewChild } from '@angular/core';

import { ImagePlaceholderRetriever } from '../image-placeholder.service';

@Component({
  selector: 'ddap-resource-logo',
  templateUrl: './resource-logo.component.html',
  styleUrls: ['./resource-logo.component.scss'],
})
export class ResourceLogoComponent implements AfterViewInit {

  @Input()
  imageUrl: string;
  @ViewChild('logoPane', { static: false })
  logoDiv: any;

  constructor(private renderer: Renderer2, private imgInjector: ImagePlaceholderRetriever) {}

  ngAfterViewInit() {
    if (this.imageUrl) {
      this.renderer.setStyle(this.logoDiv.nativeElement, 'background-image', `url('${this.imageUrl}')`);
    } else {
      const placeholderImageUrl = this.imgInjector.getPathToFixedRandomImage(null);
      this.renderer.setStyle(this.logoDiv.nativeElement, 'background-image', `url('${placeholderImageUrl}')`);
    }

    this.renderer.setStyle(this.logoDiv.nativeElement, 'background-position-y', '50%');
  }

}
