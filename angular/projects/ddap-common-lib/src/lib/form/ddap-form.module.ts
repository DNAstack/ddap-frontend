import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormFooterErrorComponent } from "./form-footer-error/form-footer-error.component";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    FormFooterErrorComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
  ],
  exports: [
    FormFooterErrorComponent,
  ]
})
export class DdapFormModule { }
