import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        MessagesComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Tour of Heroes'`, () => {
    expect(component.title).toEqual('Tour of Heroes');
  });

  it('should have app-heroes', () => {
    expect(compiled.querySelector('app-heroes')).toBeDefined();
  });

  it('should have messaging', () => {
    expect(compiled.querySelector('app-messages')).toBeTruthy();
  });

  it(`should have link to '/dashboard'`, () => {
    const links = fixture.debugElement.queryAll(By.css(`a`));
    expect(links[0].nativeElement.getAttribute('href'))
      .toEqual('/dashboard');
  });

  it(`should have link to '/heroes'`, () => {
    const links = fixture.debugElement.queryAll(By.css(`a`));
    expect(links[1].nativeElement.getAttribute('href'))
      .toEqual('/heroes');
  });
});
