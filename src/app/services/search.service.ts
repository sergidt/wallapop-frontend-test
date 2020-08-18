import { Injectable, Inject } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Item, FILTERING_DATA, FilteringData, SearchResult, SearchResultStatus } from '../definitions';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(@Inject(FILTERING_DATA) private filteringData: FilteringData) {
  }

  filterByTerm(search$: Observable<string>): Observable<SearchResult> {
    return combineLatest([
      this.filteringData.dataSource,
      search$.pipe(startWith(''))
    ])
        .pipe(
            map(([items, term]: [Array<Item>, string]) => {
              const filteredItems = items.filter(_ => this.filteringData.filterFunction(_, term));
              return {
                filteredItems,
                totalItemsCount: items.length,
                status: !items.length
                    ? SearchResultStatus.EmptyDataSource
                    : !filteredItems.length
                        ? SearchResultStatus.EmptyByFilter
                        : SearchResultStatus.Ok
              } as SearchResult;
            }),
            distinctUntilChanged()
        );
  }
}
