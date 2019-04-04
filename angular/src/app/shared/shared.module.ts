import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from '../app-routing.module';

import { BeaconSearchBarComponent } from './beacon-search-bar/beacon-search-bar.component';
import { LimitSearchComponent } from './beacon-search-bar/limit-search/limit-search.component';
import { BeaconResultComponent } from './beacons/beacon-result/beacon-result.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavBackComponent } from './nav-back/nav-back.component';
import { ResourceLogoComponent } from './resource-logo/resource-logo.component';
import { ResourceViewItemComponent } from './resource-view-item/resource-view-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    NavBackComponent,
    ResourceLogoComponent,
    ResourceViewItemComponent,
    BeaconSearchBarComponent,
    BeaconResultComponent,
    LimitSearchComponent,
  ],
  imports: [
    AppRoutingModule,

    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ReactiveFormsModule,

    MatCardModule,
    MatChipsModule,
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
    BrowserAnimationsModule,
    ClipboardModule,
    ReactiveFormsModule,

    MatCardModule,
    MatChipsModule,
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
    BeaconSearchBarComponent,
    BeaconResultComponent,
    ResourceLogoComponent,
    ResourceViewItemComponent,
    LimitSearchComponent,
  ],
})
export class SharedModule {
}
