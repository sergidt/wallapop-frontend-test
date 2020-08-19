import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { HttpClient } from '@angular/common/http';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClient] });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return an array on items', () => {
    service.getItems()
           .subscribe(_ => expect(_.length).toEqual(20));
  });

});
