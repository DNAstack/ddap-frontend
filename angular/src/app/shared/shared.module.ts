import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from '../app-routing.module';

import { EntityListComponent } from './entityList/entityList.component';
import { JsonPanelComponent } from './jsonPanel/jsonPanel.component';
import { NavBackComponent } from './navBack/navBack.component';

@NgModule({
  declarations: [
    JsonPanelComponent,
    EntityListComponent,
    NavBackComponent,
  ],
  imports: [
    AppRoutingModule,

    ClipboardModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatProgressBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,

    NgJsonEditorModule,
  ],
  exports: [
    ClipboardModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatProgressBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,

    NgJsonEditorModule,
    NavBackComponent,
    JsonPanelComponent,
    EntityListComponent,
  ],
})
export class SharedModule { }
