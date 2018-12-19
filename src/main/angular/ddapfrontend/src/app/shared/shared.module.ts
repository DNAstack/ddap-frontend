import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatSidenavModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatSidenavModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    MatSidenavModule
  ]
})
export class SharedModule { }
