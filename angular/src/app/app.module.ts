import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsModule } from './clients/clients.module';
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

    SharedModule,
    AppRoutingModule,
    ResourcesModule,
    ClientsModule,
    RulesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
