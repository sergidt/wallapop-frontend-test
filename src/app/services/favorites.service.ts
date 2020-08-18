import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../definitions';
import { shareReplay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _favorites$: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>([]);

  get favorites$(): Observable<Array<Item>> {
    return this._favorites$
               .pipe(shareReplay({refCount: true}));
  }

  get favoriteIds$(): Observable<Array<number>> {
    return this._favorites$
               .pipe(
                   map((favorites: Array<Item>) => favorites.map(_ => _.id)),
                   shareReplay({refCount: true})
               );
  }

  toggleFavorite(item: Item): void {
    const currentFavorites: Array<Item> = this._favorites$.getValue();

    this._favorites$.next(
        currentFavorites.some(f => f.id === item.id) // Favorites model contains provided id ?
            ? currentFavorites.filter(_ => _.id !== item.id) // Yes -> filter it in order to unmark as favorite
            : [...currentFavorites, item] // NO -> add as a new favorite
    );
  }
}
