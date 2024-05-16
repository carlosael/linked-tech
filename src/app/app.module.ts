import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchCollectionsComponent } from './components/search-collections/search-collections.component';
import { CollectionDisplayComponent } from './components/card-display/collection-display.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MagicApiService } from './services/magic-api.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchCollectionsComponent,
    CollectionDisplayComponent,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, HttpClientModule],
  providers: [MagicApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
