import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { defer } from 'rxjs';

describe('HeroesComponent: init', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        HeroesComponent,
        HeroDetailComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    component.heroes = HEROES;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroes', () => {
    expect(component.heroes).toBeDefined();
  });

  it('should have a list of heroes', async () => {
    HEROES.forEach( (hero, index) => {
      expect(compiled.querySelector(`ul > li:nth-child(${index + 1})`).textContent)
        .toContain(hero.name);
    });
  });

  it('should not have selected hero', () => {
    expect(component.selectedHero).not.toBeDefined();
    expect(compiled.querySelector('#details')).toBe(null);
  });
});

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const heroServiceStub = {
  getHeroes() {
    return fakeAsyncResponse([
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' }
    ]);
  }
};

describe('data: hero.service',  () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        HeroesComponent,
        HeroDetailComponent
      ],
      providers: [{provide: HeroService, useValue: heroServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    component.heroes = HEROES;
    fixture.detectChanges();
  });

  it('should have two heroes', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const heroes = fixture.debugElement.queryAll(By.css('.hero'));
    expect(heroes.length).toEqual(2);
  });
});
