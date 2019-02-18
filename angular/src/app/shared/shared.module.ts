import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from '../app-routing.module';

import { BeaconResultComponent } from './beacons/beacon-result/beacon-result.component';
import { BeaconSearchBarComponent } from './beacons/beacon-search-bar/beacon-search-bar.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavBackComponent } from './nav-back/nav-back.component';
import { ResourceLogoComponent } from './resource-logo/resource-logo.component';
import { ResourceViewsComponent } from './resource-views/resource-views.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    NavBackComponent,
    ResourceLogoComponent,
    ResourceViewsComponent,
    BeaconSearchBarComponent,
    BeaconResultComponent,
  ],
  imports: [
    AppRoutingModule,

    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ClipboardModule,

    MatCardModule,
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
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [
    AppRoutingModule,

    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ClipboardModule,

    MatCardModule,
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
    MatSelectModule,
    MatTooltipModule,

    HeaderComponent,
    MainComponent,
    NavBackComponent,
    BeaconSearchBarComponent,
    BeaconResultComponent,
    ResourceLogoComponent,
    ResourceViewsComponent,
  ],
})
export class SharedModule { }
