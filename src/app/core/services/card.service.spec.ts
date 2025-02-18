import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CardService } from './card.service';
import { Card } from './../models/card/card.model';
import { environment } from '../../environments/environment';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService],
    });

    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar cartões via solicitação GET', () => {
    const mockCards: Card[] = [
      {
        id: 1,
        title: 'Card 1',
        description: 'Description 1',
        img: 'image1.jpg',
        type: 'basic',
      },
      {
        id: 2,
        title: 'Card 2',
        description: 'Description 2',
        img: 'image2.jpg',
        type: 'premium',
      },
    ];

    service.getCards().subscribe((cards) => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(mockCards);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });
});
