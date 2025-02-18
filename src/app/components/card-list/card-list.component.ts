import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../core/services/card.service';
import { SearchComponent } from '../search/search.component';
import { Card } from '../../core/models/card/card.model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, SearchComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit {
  cards: ReadonlyArray<Card> = [];
  filteredCards: ReadonlyArray<Card> = [];

  constructor(private readonly cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe((data: Card[]) => {
      this.cards = [...data]; 
      this.filteredCards = [...data];
    });
  }

  filterCards(searchText: string): void {
    const lowerSearch = searchText.toLowerCase();
    this.filteredCards = this.cards.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(lowerSearch) ||
        description.toLowerCase().includes(lowerSearch)
    );
  }

  removeCard(cardId: number): void {
    this.cards = this.cards.filter(({ id }) => id !== cardId);
    this.filteredCards = this.filteredCards.filter(({ id }) => id !== cardId);
  }
}
