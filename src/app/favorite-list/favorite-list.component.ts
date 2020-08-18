import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Item, FILTERING_DATA, FilteringData } from '../definitions';
import { FilterBaseComponent } from '../filter-base.component';
import { SearchService } from '../services/search.service';

export function favoriteListFactory(service: FavoritesService): FilteringData {
  return {
    dataSource: service.favorites$,
    filterFunction: ({ title }: Item, searchTerm: string): boolean => title.toLowerCase().includes(searchTerm.toLowerCase())
  };
}


@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  providers: [
    SearchService,
    {
      provide: FILTERING_DATA, useFactory: favoriteListFactory, deps: [FavoritesService]
    }
  ]
})
export class FavoriteListComponent extends FilterBaseComponent implements OnInit {
  filteredFavorites: Array<Item>;

  constructor(public favoritesService: FavoritesService,
              private searchService: SearchService,
              private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.searchService.filterByTerm(this._search$)
    .subscribe(_ => {
      this.filteredFavorites = _;
      this.cd.markForCheck();
    });
  }

  remove(favorite: Item) {
    this.favoritesService.toggleFavorite(favorite);
  }
}
