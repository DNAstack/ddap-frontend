import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { flatMap, pluck } from 'rxjs/operators';

import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
})
export class ClaimDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  claim: any;
  // A (possible edited) resource from the json editor.
  claimDto: any;
  views: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public claimService: ClaimService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getClaim(params['claimName']))
    ).subscribe((claimDto) => {
      this.claim = claimDto;
      this.claimDto = claimDto;
    });
  }

  private getClaim(claimName) {
    return this.claimService
      .get()
      .pipe(
        pluck(claimName)
      );
  }
}
