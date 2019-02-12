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
  MatProgressBarModule,
  MatSidenavModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from '../app-routing.module';

import { BeaconResultComponent } from './beacons/beacon-result/beacon-result.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavBackComponent } from './nav-back/nav-back.component';
import { ResourceLogoComponent } from './resource-logo/resource-logo.component';
import { ResourceViewsComponent } from './resource-views/resource-views.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    NavBackComponent,
    ResourceLogoComponent,
    ResourceViewsComponent,
    SearchBarComponent,
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

    HeaderComponent,
    MainComponent,
    NavBackComponent,
    SearchBarComponent,
    BeaconResultComponent,
    ResourceLogoComponent,
    ResourceViewsComponent,
  ],
})
export class SharedModule { }
