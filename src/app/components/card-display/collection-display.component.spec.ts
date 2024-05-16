import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionDisplayComponent } from './collection-display.component';
import { MagicApiService } from '../../services/magic-api.service';
import { of, throwError } from 'rxjs';

describe('CollectionDisplayComponent', () => {
  let component: CollectionDisplayComponent;
  let fixture: ComponentFixture<CollectionDisplayComponent>;
  let mockApiService: any;

  beforeEach(async () => {
    spyOn(console, 'error');
    mockApiService = {
      collections$: of([]),
      getBooster: jasmine.createSpy('getBooster').and.returnValue(
        of({
          cards: [
            {
              types: ['Creature'],
              imageUrl: 'url1',
              name: 'Card 1',
              manaCost: '1',
              colorIdentity: 'Red',
              text: 'Sample Text',
            },
          ],
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CollectionDisplayComponent],
      providers: [{ provide: MagicApiService, useValue: mockApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty collections', () => {
    expect(component.collections.length).toBe(0);
    expect(component.hasCollection).toBeFalse();
  });

  it('should handle no collections', () => {
    mockApiService.collections$ = of([]);
    fixture.detectChanges();
    expect(component.collections.length).toBe(0);
    expect(component.hasCollection).toBeFalse();
  });

  it('should handle errors during booster pack fetches', () => {
    const errorResponse = new Error('Network error');
    mockApiService.getBooster.and.returnValue(throwError(() => errorResponse));

    component.openBoosters('TC');
    expect(component.isLoading).toBeFalse();
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching booster packs:',
      errorResponse
    );
  });
});
