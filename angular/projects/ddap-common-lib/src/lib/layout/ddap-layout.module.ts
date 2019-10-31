import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MainComponent } from './main/main.component';
import { HeaderComponent } from "./header/header.component";
import { HeaderBtnComponent } from "./header/header-btn/header-btn.component";
import { HeaderAddBtnComponent } from "./header/header-add-btn/header-add-btn.component";

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderBtnComponent,
    HeaderAddBtnComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    HeaderBtnComponent,
    HeaderAddBtnComponent,
    MainComponent,
  ]
})
export class DdapLayoutModule { }
