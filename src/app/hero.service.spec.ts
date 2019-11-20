import {inject, TestBed} from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  it(`get all heroes`, inject([HeroService], (heroService) => {
    heroService.getHeroes().subscribe(heroes => {
      expect(heroes.length).toEqual(10);
    });
  }));
});
