import { Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class FilterBaseComponent {
  protected _search$: Subject<string> = new Subject<string>();

  applyFilter(searchTerm: string = '') {
    this._search$.next(searchTerm);
  }
}
