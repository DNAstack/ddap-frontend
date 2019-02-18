import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ddap-resource-views',
  templateUrl: './resource-views.component.html',
  styleUrls: ['./resource-views.component.scss'],
})
export class ResourceViewsComponent {

  @Input()
  view: any;

  @Output()
  accessRequested: EventEmitter<void> = new EventEmitter();

  getAccess(): void {
    if (!this.isTokenGranted()) {
      this.accessRequested.emit();
    }
  }

  isTokenGranted() {
    return this.view.url || this.view.token;
  }

}
