import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { SearchCollectionsComponent } from './search-collections.component';
import { MagicApiService } from '../../services/magic-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchCollectionsComponent', () => {
  let component: SearchCollectionsComponent;
  let fixture: ComponentFixture<SearchCollectionsComponent>;
  let apiServiceMock: any;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('MagicApiService', [
      'getCollections',
      'updateCollections',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, HttpClientModule, SearchCollectionsComponent],
      providers: [{ provide: MagicApiService, useValue: apiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if no block is selected', () => {
    spyOn(window, 'alert');
    component.selectedBlock = '';
    component.search();
    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, selecione um bloco antes de buscar.'
    );
  });

  it('should handle empty search name correctly', () => {
    const mockResponse = { sets: ['set1', 'set2'] };
    apiServiceMock.getCollections.and.returnValue(of(mockResponse));

    component.selectedBlock = 'Ixalan';
    component.search();

    expect(apiServiceMock.getCollections).toHaveBeenCalledWith('Ixalan');
    expect(apiServiceMock.updateCollections).toHaveBeenCalledWith([
      'set1',
      'set2',
    ]);
  });

  it('should concatenate block and name if search name is provided', () => {
    const mockResponse = { sets: ['set1', 'set2'] };
    apiServiceMock.getCollections.and.returnValue(of(mockResponse));

    component.selectedBlock = 'Ixalan';
    component.searchName = 'Expansion';
    component.search();

    expect(apiServiceMock.getCollections).toHaveBeenCalledWith(
      'Ixalan|Expansion'
    );
    expect(apiServiceMock.updateCollections).toHaveBeenCalledWith([
      'set1',
      'set2',
    ]);
  });

  it('should handle API error correctly', () => {
    spyOn(console, 'error');
    spyOn(window, 'alert');
    const error = { message: 'Network error' };
    apiServiceMock.getCollections.and.returnValue(
      throwError(() => new Error('Network error'))
    );

    component.selectedBlock = 'Ixalan';
    component.search();

    expect(console.error).toHaveBeenCalledWith(
      'Erro ao buscar coleções:',
      jasmine.any(Error)
    );
    expect(window.alert).toHaveBeenCalledWith(
      'Erro ao buscar coleções. Veja o console para mais detalhes.'
    );
  });
});
