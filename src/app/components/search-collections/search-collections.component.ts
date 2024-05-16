import { Component } from '@angular/core';
import { MagicApiService } from '../../services/magic-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search-collections',
  templateUrl: './search-collections.component.html',
  styleUrls: ['./search-collections.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SearchCollectionsComponent {
  searchName: string = '';
  selectedBlock: string = '';

  constructor(private apiService: MagicApiService) {}

  search(): void {
    if (!this.selectedBlock) {
      alert('Por favor, selecione um bloco antes de buscar.');
      return;
    }

    if (!this.searchName) {
      this.apiService.getCollections(this.selectedBlock).subscribe({
        next: (data) => {
          console.log('Dados recebidos:', data);
          this.apiService.updateCollections(data.sets);
        },
        error: (error) => {
          console.error('Erro ao buscar coleções:', error);
          alert('Erro ao buscar coleções. Veja o console para mais detalhes.');
        },
      });
    } else {
      const block = this.selectedBlock + '|' + this.searchName;

      this.apiService.getCollections(block).subscribe({
        next: (data) => {
          console.log('Dados recebidos:', data);
          this.apiService.updateCollections(data.sets);
        },
        error: (error) => {
          console.error('Erro ao buscar coleções:', error);
          alert('Erro ao buscar coleções. Veja o console para mais detalhes.');
        },
      });
    }
  }
}
