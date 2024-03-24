import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { TableRowComponent } from './table/table-row/table-row.component';
import { NgModel } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TableComponent,
    TableRowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
