import { Injectable, Inject } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Item, FILTERING_DATA, FilteringData } from '../definitions';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(@Inject(FILTERING_DATA) private filteringData: FilteringData) {
  }

  filterByTerm(search$: Observable<string>): Observable<Array<Item>> {
    return combineLatest([
      this.filteringData.dataSource,
      search$.pipe(startWith(''))
    ])
        .pipe(
            map(([items, term]: [Array<Item>, string]) => items.filter(_ => this.filteringData.filterFunction(_, term))),
            distinctUntilChanged()
        );
  }
}
