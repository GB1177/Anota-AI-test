import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './../models/card/card.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }
}
