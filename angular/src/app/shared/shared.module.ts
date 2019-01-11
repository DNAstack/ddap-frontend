import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatSidenavModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';
import {ClipboardModule} from "ngx-clipboard";
import {NgxJsonViewerModule} from "ngx-json-viewer";

@NgModule({
  declarations: [],
  imports: [
    ClipboardModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,

    NgxJsonViewerModule
  ],
  exports: [
    ClipboardModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,

    NgxJsonViewerModule
  ]
})
export class SharedModule { }
