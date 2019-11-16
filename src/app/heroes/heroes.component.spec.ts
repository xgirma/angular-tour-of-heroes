import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;
  const hero: Hero = { id: 1, name: 'Windstorm' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    component.hero = hero;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hero', () => {
    expect(component.hero).toBeDefined();
  });

  it(`should have title ${hero.name} Details`, () => {
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual(`${(hero.name).toUpperCase()} Details`);
  });

  it(`should have id ${hero.id}`, () => {
    expect(compiled.querySelector('#hro-id').textContent)
      .toEqual(`id: ${hero.id}`);
  });

  it(`should have text '${hero.name}' in the input`, () => {
    return fixture.whenStable().then(() => {
      const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputBox.value).toEqual(hero.name);
    });
  });
});

describe('HeroesComponent: input', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;
  const hero: Hero = { id: 1, name: 'Windstorm' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    component.hero = hero;
  });

  it('input should accept new value', () => {
    return fixture.whenStable().then(() => {
      const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;

      inputBox.value = 'Foo';
      inputBox.dispatchEvent(new Event('input'));

      expect(inputBox.value).toBe('Foo');
    });
  });
});
