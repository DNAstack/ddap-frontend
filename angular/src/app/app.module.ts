import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClaimsModule } from './claims/claims.module';
import { ClientsModule } from './clients/clients.module';
import { DataModule } from './data/data.module';
import { DefinitionsModule } from './definitions/definitions.module';
import { GrantsModule } from './grants/grants.module';
import { PassportsModule } from './passports/passports.module';
import { PersonasModule } from './personas/personas.module';
import { ResourcesModule } from './resources/resources.module';
import { RulesModule } from './rules/rules.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingBarHttpClientModule,

    SharedModule,
    AppRoutingModule,
    ResourcesModule,
    ClaimsModule,
    ClientsModule,
    PassportsModule,
    DefinitionsModule,
    PersonasModule,
    GrantsModule,
    RulesModule,
    DataModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
