import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CollectionDisplayComponent } from './components/card-display/collection-display.component';
import { SearchCollectionsComponent } from './components/search-collections/search-collections.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CollectionDisplayComponent,
    SearchCollectionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'magic-the-gathering-app';
}
