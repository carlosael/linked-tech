import { Component, OnInit } from '@angular/core';
import { MagicApiService } from '../../services/magic-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class CollectionDisplayComponent implements OnInit {
  collections: any[] = [];
  creatureCards: any[] = [];
  isLoading: boolean = false;
  hasCollection: boolean = false;
  hasCards: boolean = false;

  constructor(private apiService: MagicApiService) {}

  ngOnInit(): void {
    this.apiService.collections$.subscribe((collections) => {
      this.collections = collections;
      if (collections.length > 0) this.hasCollection = true;
    });
  }

  openBoosters(setId: string): void {
    this.isLoading = true;
    this.creatureCards = [];
    this.getBoosterPacks(setId);
  }

  getBoosterPacks(setId: string) {
    if (this.creatureCards.length < 30) {
      this.apiService.getBooster(setId).subscribe({
        next: (data) => {
          const creatures = data.cards.filter((card: any) =>
            card.types.includes('Creature')
          );
          this.creatureCards.push(...creatures);
          this.getBoosterPacks(setId);
          this.hasCards = true;
        },
        error: (error) => {
          console.error('Error fetching booster packs:', error);
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  getManaIcons(colorIdentity: string): string {
    const manaIcons: { [key: string]: string } = {
      U: 'assets/U.webp',
      B: 'assets/B.webp',
      R: 'assets/R.webp',
      G: 'assets/G.webp',
      W: 'assets/W.png',
    };
    return manaIcons[colorIdentity];
  }
}
