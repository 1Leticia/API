import { TestBed } from '@angular/core/testing';

import { EndereçoService } from './endereço.service';

describe('EndereçoService', () => {
  let service: EndereçoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndereçoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
