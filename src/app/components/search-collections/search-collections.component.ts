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
  searchName: string = ''; // Nome do bloco a ser pesquisado
  selectedBlock: string = ''; // Bloco selecionado no dropdown

  constructor(private apiService: MagicApiService) {}

  // Método para lidar com a submissão do formulário
  // search(): void {
  //   if (!this.selectedBlock) {
  //     alert('Por favor, selecione um bloco antes de buscar.');
  //     return;
  //   }

  //   // Chamada ao serviço para buscar dados baseado no nome e bloco
  //   this.apiService.getCollections(this.selectedBlock).subscribe({
  //     next: (data) => {
  //       console.log('Dados recebidos:', data);
  //       return data;
  //       // Tratamento dos dados recebidos (por exemplo, atualizar uma variável de estado)
  //     },
  //     error: (error) => {
  //       console.error('Erro ao buscar coleções:', error);
  //       alert('Erro ao buscar coleções. Veja o console para mais detalhes.');
  //     },
  //   });
  // }

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
