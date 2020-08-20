import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { EMPTY_ITEM } from '../definitions';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('FavoritesService: favorites$ stream', () => {
    test('should have 0 favorites when created', () => {
      service.favorites$
             .subscribe(_ => expect(_).toEqual([]));
    });

    test('should have 1 favorite when toggling once after its creation', () => {
      service.toggleFavorite(EMPTY_ITEM);

      service.favorites$
             .subscribe(_ => expect(_).toHaveLength(1));
    });

    test('should contain an empty array when toggling same item twice', () => {
      service.toggleFavorite(EMPTY_ITEM);
      service.toggleFavorite(EMPTY_ITEM);

      service.favorites$
             .subscribe(_ => expect(_).toEqual([]));
    });
  });

  describe('FavoritesService: favoriteIds$ stream', () => {
    test('should have 0 favorites when created', () => {
      service.favoriteIds$
             .subscribe(_ => expect(_).toEqual([]));
    });

    test('should have 1 favorite id when toggle toggling after its creation', () => {
      service.toggleFavorite(EMPTY_ITEM);

      service.favoriteIds$
             .subscribe(_ => {
               expect(_).toHaveLength(1);
               expect(_).toEqual([{id: 1}]);
             });
    });

    test('should contain an empty array when toggling same item twice', () => {
      service.toggleFavorite(EMPTY_ITEM);
      service.toggleFavorite(EMPTY_ITEM);

      service.favoriteIds$
             .subscribe(_ => expect(_).toEqual([]));
    });
  });
});
