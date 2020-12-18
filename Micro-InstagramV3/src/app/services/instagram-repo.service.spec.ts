import { TestBed } from '@angular/core/testing';

import { InstagramRepoService } from './instagram-repo.service';

describe('InstagramRepoService', () => {
  let service: InstagramRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstagramRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
