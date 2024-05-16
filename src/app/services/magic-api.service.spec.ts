import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MagicApiService } from './magic-api.service';

describe('MagicApiService', () => {
  let service: MagicApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.magicthegathering.io/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MagicApiService],
    });
    service = TestBed.inject(MagicApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch collections based on block', () => {
    const mockResponse = { sets: [{ id: 'xyz', name: 'Test Set' }] };
    const block = 'Ixalan';
    service.getCollections(block).subscribe((collections) => {
      expect(collections.sets.length).toBe(1);
      expect(collections.sets[0].name).toEqual('Test Set');
    });

    const req = httpMock.expectOne(`${baseUrl}/sets?block=${block}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update collections data', () => {
    const newCollections = [{ id: 'abc', name: 'New Set' }];

    service.collections$.subscribe((collections) => {
      if (collections.length > 0) {
        expect(collections[0].name).toEqual('New Set');
      }
    });

    service.updateCollections(newCollections);
  });

  it('should fetch booster packs', () => {
    const setId = '12345';
    const mockBooster = { cards: [{ id: 'card1', name: 'Magic Card' }] };
    service.getBooster(setId).subscribe((booster) => {
      expect(booster.cards.length).toBe(1);
      expect(booster.cards[0].name).toEqual('Magic Card');
    });

    const req = httpMock.expectOne(`${baseUrl}/sets/${setId}/booster`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooster);
  });
});
