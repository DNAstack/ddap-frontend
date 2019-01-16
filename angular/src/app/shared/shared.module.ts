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
import {NgJsonEditorModule} from "ang-jsoneditor";

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

    NgJsonEditorModule
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

    NgJsonEditorModule
  ]
})
export class SharedModule { }
