// modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// services
import { AzureTableService } from './shared/azure-table.service';
// components
import { AppComponent }  from './app.component';
import { AzureTableComponent } from './azure-table/azure-table.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, AzureTableComponent ],
  bootstrap:    [ AzureTableComponent ],
  providers:    [ AzureTableService ]
})
export class AppModule { }
