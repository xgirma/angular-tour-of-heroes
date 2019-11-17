# Testing Angular Tour Of Heroes
Exploring the process of the unit- and e2e-testing the Tour of Heroes application. 
Focusing on the connection between application progression and test development.

## AppComponent
AppComponent is the application shell. There is not much to test, at this point. 
The default unit- and e2e-tests generated by the `ng new` command contains a few guiding sanity-tests, as shown below.

#### unit test: AppComponent
```javascript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-tour-of-heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-tour-of-heroes');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent)
      .toContain('angular-tour-of-heroes app is running!');
  });
});
``` 

#### e2e test: AppComponent
```javascript
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('angular-tour-of-heroes app is running!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
```

Once we clear the content of `app.component.html` to build a new app, the tests will start fail, because there is no HTML content.

#### unit test: AppComponent
```text
1) should render title
     AppComponent
     TypeError: Cannot read property 'textContent' of null
    at <Jasmine>
    at UserContext.<anonymous> (http://localhost:9876/_karma_webpack_/src/app/app.component.spec.ts:29:51)
    at ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/node_modules/zone.js/dist/zone-evergreen.js:359:1)
    at ProxyZoneSpec.push../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke (http://localhost:9876/_karma_webpack_/node_modules/zone.js/dist/zone-testing.js:308:1)
    at ZoneDelegate.invoke (http://localhost:9876/_karma_webpack_/node_modules/zone.js/dist/zone-evergreen.js:358:1)
    at Zone.run (http://localhost:9876/_karma_webpack_/node_modules/zone.js/dist/zone-evergreen.js:124:1)
    at runInTestZone (http://localhost:9876/_karma_webpack_/node_modules/zone.js/dist/zone-testing.js:561:1)
    at UserContext.<anonymous> (http://localhost:9876/_karma_webpack_/node_modules/zone.js/dist/zone-testing.js:576:1)
    at <Jasmine>
```

#### e2e test: AppComponent
```text
workspace-project App
    ✗ should display welcome message
      - Failed: No element found using locator: By(css selector, app-root .content span)
          at elementArrayFinder.getWebElements.then (/Users/girmae.nigusse/WebstormProjects/angular-tour-of-heroes/node_modules/protractor/built/element.js:814:27)
          at ManagedPromise.invokeCallback_ (/Users/girmae.nigusse/WebstormProjects/angular-tour-of-heroes/node_modules/selenium-webdriver/lib/promise.js:1376:14)
          at TaskQueue.execute_ (/Users/girmae.nigusse/WebstormProjects/angular-tour-of-heroes/node_modules/selenium-webdriver/lib/promise.js:3084:14)
          at TaskQueue.executeNext_ (/Users/girmae.nigusse/WebstormProjects/angular-tour-of-heroes/node_modules/selenium-webdriver/lib/promise.js:3067:27)
          at asyncRun (/Users/girmae.nigusse/WebstormProjects/angular-tour-of-heroes/node_modules/selenium-webdriver/lib/promise.js:2927:27)
          at /Users/girmae.nigusse/WebstormProjects/angular-tour-of-heroes/node_modules/selenium-webdriver/lib/promise.js:668:7
          at process._tickCallback (internal/process/next_tick.js:68:7)Error:
```

#### unit test: AppComponent
```diff
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-tour-of-heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-tour-of-heroes');
  });

-  it('should render title', () => {
-    const fixture = TestBed.createComponent(AppComponent);
-    fixture.detectChanges();
-    const compiled = fixture.debugElement.nativeElement;
-    expect(compiled.querySelector('.content span').textContent)
-      .toContain('angular-tour-of-heroes app is running!');
-  });
});
```
