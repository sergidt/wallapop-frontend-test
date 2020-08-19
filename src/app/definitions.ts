import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
    description: string;
    email: string;
    image: string;
    price: string;
    title: string;

    // transient properties
    isFavorite?: boolean;
    id?: number;
}

export type FilterFunction = (item: Item, term: string) => boolean;

export interface FilteringData {
    dataSource: Observable<Array<Item>>;
    filterFunction: FilterFunction;
}

export enum SearchResultStatus {
    EmptyDataSource,
    EmptyByFilter,
    Ok,
    Loading
}

export interface SearchResult {
    filteredItems: Array<Item>;
    totalItemsCount: number;
    status: SearchResultStatus;
}

export const LOADING_RESULT: SearchResult = {
    status: SearchResultStatus.Loading,
    filteredItems: [],
    totalItemsCount: 0
};

export const FILTERING_DATA: InjectionToken<FilteringData> = new InjectionToken<FilteringData>('FILTERING_DATA');
