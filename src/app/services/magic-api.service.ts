// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class MagicApiService {
//   private baseUrl = 'https://api.magicthegathering.io/v1';

//   constructor(private http: HttpClient) {}

//   getCollections(block: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/sets?block=${block}`);
//   }

//   getBooster(setId: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/sets/${setId}/booster`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagicApiService {
  private baseUrl = 'https://api.magicthegathering.io/v1';
  private collectionsSource = new BehaviorSubject<any[]>([]);
  public collections$ = this.collectionsSource.asObservable();

  constructor(private http: HttpClient) {}

  getCollections(block: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/sets?block=${block}`);
  }

  updateCollections(collections: any[]): void {
    this.collectionsSource.next(collections);
  }

  getBooster(setId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/sets/${setId}/booster`);
  }
}
