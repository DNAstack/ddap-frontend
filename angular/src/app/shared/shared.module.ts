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
    MatListModule
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
    MatListModule
  ]
})
export class SharedModule { }
