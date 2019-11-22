import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { HEROES } from '../mock-heroes';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DashboardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.heroes = HEROES.slice(1, 5);
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
    const heroes = fixture.debugElement.queryAll(By.css(`.module.hero > h4`));
    component.heroes.forEach( (hero, index) => {
      expect(heroes[index].nativeElement.textContent).toContain(hero.name);
    });
  });

  it('should have a link of heroes', async () => {
    const heroes = fixture.debugElement.queryAll(By.css(`a`));
    component.heroes.forEach( (hero, index) => {
      expect(heroes[index].nativeElement.getAttribute('href'))
        .toContain(`/detail/${hero.id}`);
    });
  });
});
