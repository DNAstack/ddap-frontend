import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { EntityListComponent } from "./entity-list/entity-list.component";
import { OptionEditableListComponent } from "./option-editable-list/option-editable-list.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { NgJsonEditorModule } from "ang-jsoneditor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { EntityDescriptionComponent } from "./entity-description/entity-description.component";
import { EntityDescriptionLinkComponent } from "./entity-description/entity-description-link.component";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    EntityDescriptionComponent,
    EntityDescriptionLinkComponent,
    EntityListComponent,
    OptionEditableListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgJsonEditorModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    EntityDescriptionComponent,
    EntityDescriptionLinkComponent,
    EntityListComponent,
    OptionEditableListComponent,
  ]
})
export class DdapAdminModule { }
