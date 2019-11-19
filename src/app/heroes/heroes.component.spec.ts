import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HEROES } from '../mock-heroes';

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
