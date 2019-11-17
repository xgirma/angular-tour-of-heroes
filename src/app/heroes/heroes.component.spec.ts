import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeroesComponent } from './heroes.component';
import { HEROES } from '../mock-heroes';

describe('HeroesComponent: init', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

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
    component.heroes = HEROES;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroes', () => {
    expect(component.heroes).toBeDefined();
    expect(component.selectedHero).not.toBeDefined();
  });

  it('should not have selected hero', () => {
    expect(compiled.querySelector('#details')).toBe(null);
  });
});

describe('HeroesComponent: select', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

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
    component.heroes = HEROES;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title ${HEROES[0].name} Details`, async () => {
    const myHero = fixture.debugElement.queryAll(By.css('.badge'));
    myHero[0].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selectedHero).toBeDefined();
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual(`${(HEROES[0].name).toUpperCase()} Details`);
  });

  it(`should have id ${HEROES[0].id}`, async () => {
    const myHero = fixture.debugElement.queryAll(By.css('.badge'));
    myHero[0].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selectedHero).toBeDefined();
    expect(compiled.querySelector('#hro-id').textContent)
      .toEqual(`id: ${HEROES[0].id}`);
  });

  it(`should have text '${HEROES[0].name}' in the input`, async () => {
    const myHero = fixture.debugElement.queryAll(By.css('.badge'));
    myHero[0].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selectedHero).toBeDefined();
    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputBox.value).toEqual(HEROES[0].name);
  });
});

describe('HeroesComponent: input', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

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
    component.heroes = HEROES;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('input should accept new value', async () => {
    const myHero = fixture.debugElement.queryAll(By.css('.badge'));
    myHero[0].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
    inputBox.value = 'Foo';
    inputBox.dispatchEvent(new Event('input'));
    expect(inputBox.value).toBe('Foo');
    fixture.detectChanges();

    expect(component.selectedHero).toBeDefined();
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual(`${(HEROES[0].name).toUpperCase()} Details`);

    expect(compiled.querySelector('li.selected').textContent).toContain('Foo');
  });
});
