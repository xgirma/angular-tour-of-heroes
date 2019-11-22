import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeroDetailComponent } from './hero-detail.component';

// TODO update with the new getHero() method
xdescribe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let compiled: any;
  const hero = { id: 20, name: 'Tornado' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ HeroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    component.hero = hero;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title ${hero.name} Details`, () => {
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual(`${(hero.name).toUpperCase()} Details`);
  });

  it(`should have id ${hero.id}`, async () => {
    expect(compiled.querySelector('#hro-id').textContent)
      .toEqual(`id: ${hero.id}`);
  });

  it(`should have text '${hero.name}' in the input`, async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputBox.value).toEqual(hero.name);
  });

  it('input should accept new value', async () => {
    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
    inputBox.value = 'Foo';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputBox.value).toBe('Foo');
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual(`${(hero.name).toUpperCase()} Details`);
  });
});
