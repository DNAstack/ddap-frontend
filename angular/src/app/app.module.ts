import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from './resources/resources.module';
import { ClientsModule } from './clients/clients.module';
import { RulesModule } from './rules/rules.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    SharedModule,
    AppRoutingModule,
    ResourcesModule,
    ClientsModule,
    RulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
