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
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from '../app-routing.module';

import { BeaconSearchBarComponent } from './beacon-search-bar/beacon-search-bar.component';
import { LimitSearchComponent } from './beacon-search-bar/limit-search/limit-search.component';
import { BeaconResultComponent } from './beacons/beacon-result/beacon-result.component';
import { ClaimGroupComponent } from './claim-group/claim-group.component';
import { FocusedDirective } from './focused.directive';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavBackComponent } from './nav-back/nav-back.component';
import { RealmChangeConfirmationDialogComponent } from './realm-change-confirmation-dialog/realm-change-confirmation-dialog.component';
import { RealmInputComponent } from './realm-input/realm-input.component';
import { ResourceLogoComponent } from './resource-logo/resource-logo.component';
import { ResourceViewItemComponent } from './resource-view-item/resource-view-item.component';

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
  ],
  imports: [
    AppRoutingModule,

    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ReactiveFormsModule,

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
  ],
})
export class SharedModule {
}
