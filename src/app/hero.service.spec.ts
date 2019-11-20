import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import {defer} from 'rxjs';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const heroServiceStub = {
  get() {
    return fakeAsyncResponse([
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' }
    ]);
  }
};

describe('HeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
