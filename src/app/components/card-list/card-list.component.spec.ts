import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CardListComponent } from './card-list.component';
import { CardService } from '../../core/services/card.service';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';
import { Card } from '../../core/models/card/card.model';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let cardService: jasmine.SpyObj<CardService>;

  beforeEach(async () => {

    const cardServiceMock = jasmine.createSpyObj('CardService', ['getCards']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CardListComponent,
        CardComponent,
        SearchComponent,
      ],
      providers: [{ provide: CardService, useValue: cardServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;


    cardService.getCards.and.returnValue(
      of([
        { id: 1, title: 'Card 1', description: 'Description 1' },
        { id: 2, title: 'Card 2', description: 'Description 2' },
      ] as Card[])
    );

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com cartões do serviço', () => {
    expect(component.cards.length).toBe(2);
    expect(component.filteredCards.length).toBe(2);
    expect(component.cards[0].title).toBe('Card 1');
  });

  it('deve filtrar os cartões corretamente', () => {
    component.filterCards('Card 1');
    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0].title).toBe('Card 1');
  });

  it('deve remover um cartão corretamente', () => {
    component.removeCard(1);
    expect(component.cards.length).toBe(1);
    expect(component.filteredCards.length).toBe(1);
    expect(component.cards[0].id).toBe(2);
  });
});
