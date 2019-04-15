import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { IdentityModule } from './identity/identity.module';
import { LayoutComponent } from './layout/layout.component';
import { RealmInterceptor } from './shared/realm/realm-interceptor.service';
import { RealmState } from './shared/realm/realm.states';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    NgxsModule.forRoot([
      RealmState,
    ], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot(),

    BrowserModule,
    HttpClientModule,
    LoadingBarHttpClientModule,

    AppRoutingModule,

    SharedModule,
    AdminModule,
    DataModule,
    IdentityModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RealmInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
