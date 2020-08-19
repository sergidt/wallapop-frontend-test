import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { FILTERING_DATA, FilteringData, Item } from '../definitions';
import { of, Observable } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FILTERING_DATA,
          useValue: {
            dataSource: of([{
              title: 'title',
              description: 'description',
              price: '10',
              email: 'email@email.com',
              image: ''
            }]) as Observable<Array<Item>>
          } as FilteringData
        }
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
