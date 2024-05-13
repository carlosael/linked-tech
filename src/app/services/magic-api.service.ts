import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagicApiService {
  private baseUrl = 'https://api.magicthegathering.io/v1';

  constructor(private http: HttpClient) {}

  getCollections(block: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/sets?block=${block}`);
  }

  getBooster(setId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/sets/${setId}/booster`);
  }
}
