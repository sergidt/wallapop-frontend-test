import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
    description: string;
    email: string;
    image: string;
    price: string;
    title: string;
}

export type FilterFunction = (item: Item, term: string) => boolean;

export interface FilteringData {
    dataSource: Observable<Array<Item>>;
    filterFunction: FilterFunction;
}

export const FILTERING_DATA: InjectionToken<FilteringData> = new InjectionToken<FilteringData>('FILTERING_DATA');
