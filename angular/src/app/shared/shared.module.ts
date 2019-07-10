import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from '../app-routing.module';

import { AsEntityModelPipe } from './as-entity-model.pipe';
import { BeaconSearchBarComponent } from './beacon-search-bar/beacon-search-bar.component';
import { LimitSearchComponent } from './beacon-search-bar/limit-search/limit-search.component';
import { BeaconResultComponent } from './beacons/beacon-result/beacon-result.component';
import { ClaimGroupComponent } from './claim-group/claim-group.component';
import {
  EntityRemovalConfirmationDialogComponent
} from './entity-removal-confirmation-dialog/entity-removal-confirmation-dialog.component';
import { FocusedDirective } from './focused.directive';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MetadataFilterPipe } from './metadata-list/metadata-filter.pipe';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { NavBackComponent } from './nav-back/nav-back.component';
import {
  RealmChangeConfirmationDialogComponent
} from './realm-change-confirmation-dialog/realm-change-confirmation-dialog.component';
import { RealmInputComponent } from './realm-input/realm-input.component';
import { ResourceLogoComponent } from './resource-logo/resource-logo.component';
import { ResourceViewItemComponent } from './resource-view-item/resource-view-item.component';
import { SandboxBannerComponent } from './sandbox-banner/sandbox-banner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    NavBackComponent,
    ResourceLogoComponent,
    ResourceViewItemComponent,
    ClaimGroupComponent,
    BeaconSearchBarComponent,
    BeaconResultComponent,
    LimitSearchComponent,
    FocusedDirective,
    RealmInputComponent,
    RealmChangeConfirmationDialogComponent,
    EntityRemovalConfirmationDialogComponent,
    MetadataListComponent,
    MetadataFilterPipe,
    AsEntityModelPipe,
    SandboxBannerComponent,
  ],
  imports: [
    AppRoutingModule,

    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
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
  ],
  exports: [
    AppRoutingModule,

    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
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

    HeaderComponent,
    MainComponent,
    NavBackComponent,
    ClaimGroupComponent,
    BeaconSearchBarComponent,
    BeaconResultComponent,
    ResourceLogoComponent,
    ResourceViewItemComponent,
    LimitSearchComponent,
    FocusedDirective,
    RealmInputComponent,
    RealmChangeConfirmationDialogComponent,
    EntityRemovalConfirmationDialogComponent,
    MetadataListComponent,
    MetadataFilterPipe,
    AsEntityModelPipe,
    SandboxBannerComponent,
  ],
})
export class SharedModule {
}
