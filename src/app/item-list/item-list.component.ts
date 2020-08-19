import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ItemService } from '../services/item.service';
import { Item, FilteringData, FILTERING_DATA, SearchResult, SearchResultStatus } from '../definitions';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { SearchService } from '../services/search.service';
import { FavoritesService } from '../services/favorites.service';
import { FilterBaseComponent } from '../filter-base.component';

export const anyItemPropertyContains = ({ title, description, email, price }: Item, searchTerm: string): boolean =>
    (title + description + email + price).toLocaleLowerCase().includes(searchTerm.toLowerCase());

export const addId = (items: Array<Item>): Array<Item> => items.map((_: Item, index: number) => ({..._, id: index + 1}));

export function itemListFactory(service: ItemService): FilteringData {
  return {
    dataSource: service.getItems().pipe(map(addId)),
    filterFunction: anyItemPropertyContains
  };
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [
    ItemService,
    SearchService,
    {
      provide: FILTERING_DATA, useFactory: itemListFactory, deps: [ItemService]
    }
  ]
})
export class ItemListComponent extends FilterBaseComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'description', 'price', 'email'];
  dataSource = new MatTableDataSource<Item>();
  searchResult: SearchResult;
  SearchResultStatus = SearchResultStatus;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private itemService: ItemService,
              private searchService: SearchService,
              private favoritesService: FavoritesService,
              private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.createSearchSubscription();
  }

  toggleFavorite(item: Item) {
    this.favoritesService.toggleFavorite(item);
  }

  private createSearchSubscription() {
    combineLatest([
      this.searchService.filterByTerm(this._search$),
      this.favoritesService.favoriteIds$
    ])
        .pipe(
            map(([result, favorites]: [SearchResult, Array<number>]) => ({
              ...result,
              filteredItems: result.filteredItems.map(_ => ({..._, isFavorite: favorites.includes(_.id)}))
            } as SearchResult))
        )
        .subscribe((_: SearchResult) => {
          this.searchResult = _;
          this.dataSource.data = this.searchResult.filteredItems;
          this.cd.markForCheck();
        });
  }
}

