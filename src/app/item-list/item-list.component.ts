import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ItemService } from '../services/item.service';
import { Item, FilteringData, FILTERING_DATA } from '../definitions';
import { Subject } from 'rxjs';
import { startWith, withLatestFrom, map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { SearchService } from '../services/search.service';

export const anyItemPropertyContains = ({ title, description, email, price }: Item, searchTerm: string): boolean =>
    (title + description + email + price).toLocaleLowerCase().includes(searchTerm.toLowerCase());

export const itemListFactory = (itemService: ItemService): FilteringData => (
    {
      dataSource: itemService.getItems(),
      filterFunction: anyItemPropertyContains
    }
);

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
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'price', 'email'];
  dataSource = new MatTableDataSource<Item>();

  search$: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private itemService: ItemService,
              private searchService: SearchService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.searchService.filterByTerm(this.search$)
        .subscribe(_ => {
          this.dataSource.data = _;
          this.cd.markForCheck();
        });
  }

  applyFilter(searchTerm: string = '') {
    this.search$.next(searchTerm);
  }
}

