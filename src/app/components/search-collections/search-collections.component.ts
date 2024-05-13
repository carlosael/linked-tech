import { Component } from '@angular/core';
import { MagicApiService } from '../../services/magic-api.service';

@Component({
  selector: 'app-search-collections',
  templateUrl: './search-collections.component.html',
  styleUrls: ['./search-collections.component.scss'],
})
export class SearchCollectionsComponent {
  selectedBlock: string = '';

  constructor(private magicApiService: MagicApiService) {}

  searchCollections(): void {
    if (this.selectedBlock) {
      this.magicApiService.getCollections(this.selectedBlock).subscribe(
        (data) => {
          console.log(data); // Trate os dados conforme necessário
        },
        (error) => {
          console.error('Error fetching collections:', error);
        }
      );
    }
  }
}
