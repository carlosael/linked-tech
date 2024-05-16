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

  constructor(private apiService: MagicApiService) {}

  ngOnInit(): void {
    this.apiService.collections$.subscribe((collections) => {
      this.collections = collections;
    });
  }
}
