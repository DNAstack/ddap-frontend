import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { of } from 'rxjs/internal/observable/of';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { DamConfigService } from '../dam/dam-config.service';
import { EntityModel } from '../../../shared/entity.model';
import { JsonEditorDefaults } from '../jsonEditorDefaults';
import { TestFormComponent } from '../test-form/test-form.component';

enum ViewState {
  Editing,
  Submitting,
  Viewing,
}

@Component({
  selector: 'ddap-json-panel',
  templateUrl: './json-panel.component.html',
  styleUrls: ['./json-panel.component.scss'],
})
export class JsonPanelComponent implements OnChanges, OnDestroy {
  error: any = null;

  @Input()
  useTests = false;
  @Input()
  routeDamId: string;

  @Input()
  entity: EntityModel;

  entityDto: object;
  testDto: object = {};
  ViewState = ViewState;
  state: ViewState = ViewState.Viewing;

  @ViewChild('entityEditor', { static: false })
  entityEditor: JsonEditorComponent;

  @ViewChild('testEditor', { static: false })
  testEditor: JsonEditorComponent;

  @ViewChild('errorEditor', { static: false })
  errorEditor: JsonEditorComponent;

  @ViewChild(TestFormComponent, { static: false })
  testForm: TestFormComponent;

  entityEditorOptions: JsonEditorOptions;
  testEditorOptions: JsonEditorOptions;
  errorEditorOptions: JsonEditorOptions;

  @Input()
  entityService: DamConfigService;

  isResource = false;

  save$: Subject<any> = new Subject();

  private saveSubscription;

  constructor(private router: Router) {
    this.entityEditorOptions = new JsonEditorDefaults();
    this.testEditorOptions = new JsonEditorDefaults();
    this.errorEditorOptions = new JsonEditorDefaults();
    this.testEditorOptions.mode = 'code';
    this.errorEditorOptions.mode = 'code';
    this.errorEditorOptions.onEditable = () => false;

    this.saveSubscription = this.save$.pipe(
      debounceTime(800),
      switchMap((dryRun) => this.saveResource(dryRun))
    ).subscribe();
  }

  ngOnChanges () {
    this.entityDto = (this.entity != null) ? this.entity.dto : null;
    this.isResource = this.entityService instanceof ResourceService;
  }

  ngOnDestroy(): void {
    this.saveSubscription.unsubscribe();
  }

  updateResourceDto(event: any) {
    if (this.entityEditor.isValidJson()) {
      this.entityDto = event;

      if (this.isResource) {
        this.save$.next(true);
      }
    }
  }

  updateTestDto(event: any) {
    this.testDto = event;
  }

  validateTest() {
    this.save$.next(true);
  }

  save() {
    this.save$.next(false);
  }

  saveResource(isDryRun = false) {
    this.state = ViewState.Submitting;

    const testDto = this.getTestDto();

    if (isDryRun) {
      testDto['dry_run'] = true;
    }

    const change = new ConfigModificationObject(this.entityDto, testDto);

    return this.entityService.update(this.routeDamId, this.entity.name, change).pipe(
      catchError((e) => {
        this.state = ViewState.Editing;
        this.error = e.error;

        if (this.isResource) {
          this.testForm.validatePersonaFields(e);
        }

        return of(true);
      }),
      tap((wasError) => {
        if (wasError) {
          return;
        }

        this.error = null;

        if (isDryRun) {
          this.state = ViewState.Editing;

          if (this.isResource) {
            return this.testForm.makeFieldsValid();
          }
        }

        this.state = ViewState.Viewing;
        this.setEditorMode('view');

        this.navigateBackTolistView();
      })
    );
  }

  cancel() {
    this.state = ViewState.Viewing;
    this.setEditorMode('view');
    this.error = null;
  }

  edit() {
    this.state = ViewState.Editing;
    this.setEditorMode('code');
  }

  remove() {
    this.state = ViewState.Submitting;
    this.entityService.remove(this.routeDamId, this.entity.name)
      .subscribe(() => {
        this.navigateBackTolistView();
      }, ({ error }) => {
        this.state = ViewState.Viewing;
        this.error = error;
      });
  }

  private navigateBackTolistView() {
    const routeToListView = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    this.router.navigate([routeToListView]);
  }

  private getTestDto() {
    if (!this.isResource) {
      return this.testDto;
    }

    return this.testForm.toApplyDto();
  }

  private setEditorMode(mode) {
    this.entityEditorOptions.mode = mode;
    this.entityEditor.setOptions(this.entityEditorOptions);
  }
}
