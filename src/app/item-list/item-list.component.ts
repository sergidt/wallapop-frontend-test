import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ItemService } from '../services/item.service';
import { Item } from '../definitions';
import { Subject } from 'rxjs';
import { startWith, withLatestFrom, map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'price', 'email'];
  dataSource = new MatTableDataSource<Item>();

  search$: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private itemService: ItemService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.itemService.getItems()
        .pipe(withLatestFrom(this.search$.pipe(startWith(''))),
            map(([items, searchTerm]: [Array<Item>, string]) => items.filter(_ => anyItemPropertyContains(_, searchTerm))))
        .subscribe(_ => {
          this.dataSource.data = _;
          this.cd.markForCheck();
        });
  }
}

export const anyItemPropertyContains = ({ title, description, email, price }: Item, searchTerm: string): boolean =>
    (title + description + email + price).toLocaleLowerCase().includes(searchTerm.toLowerCase());
