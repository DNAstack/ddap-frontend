import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DdapFormModule, DdapLayoutModule } from 'ddap-common-lib';
import { TagInputModule } from 'ngx-chips';
import { ClipboardModule } from 'ngx-clipboard';

import { BeaconResultComponent } from './beacon-search/beacon-result/beacon-result.component';
import { BeaconSearchBarComponent } from './beacon-search/beacon-search-bar/beacon-search-bar.component';
import { LimitSearchComponent } from './beacon-search/beacon-search-bar/limit-search/limit-search.component';
import { MetadataFilterPipe } from './metadata-list/metadata-filter.pipe';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {
  RealmChangeConfirmationDialogComponent
} from './realm/realm-change-confirmation-dialog/realm-change-confirmation-dialog.component';
import { RealmInputComponent } from './realm/realm-input/realm-input.component';
import { ResourceLogoComponent } from './resource-logo/resource-logo.component';
import { ResourceViewItemComponent } from './resource-view-item/resource-view-item.component';
import { ViewAccessComponent } from './view-access/view-access.component';

@NgModule({
  declarations: [
    ResourceLogoComponent,
    ResourceViewItemComponent,
    ViewAccessComponent,
    BeaconSearchBarComponent,
    BeaconResultComponent,
    LimitSearchComponent,
    RealmInputComponent,
    RealmChangeConfirmationDialogComponent,
    MetadataListComponent,
    MetadataFilterPipe,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    TagInputModule,

    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,

    DdapLayoutModule,
    DdapFormModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    TagInputModule,

    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,

    DdapLayoutModule,
    DdapFormModule,

    BeaconSearchBarComponent,
    BeaconResultComponent,
    ResourceLogoComponent,
    ResourceViewItemComponent,
    ViewAccessComponent,
    LimitSearchComponent,
    MetadataListComponent,
    MetadataFilterPipe,
    PaginatorComponent,
    RealmInputComponent,
  ],
})
export class SharedModule {
}
