# Testing Angular Tour Of Heroes
Exploring the process of the unit- and e2e-testing the Tour of Heroes application. 
Focusing on the connection between application progression and test development.

## Bootstraping
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
We will remove the falling tests and keep the rest for bootstraping our future tests.  

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

#### e2e test: AppComponent
```diff
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

-  it('should display welcome message', () => {
-    page.navigateTo();
-    expect(page.getTitleText()).toEqual('angular-tour-of-heroes app is running!');
-  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
```

Now the unit-tests should all pass. For e2e-test there will be no test to pass or fail, but the test will run successfully.

#### unit test: AppComponent
```text
17 11 2019 13:50:47.437:INFO [Chrome 78.0.3904 (Mac OS X 10.15.1)]: Connected on socket BxH0NdUALyuLhlXKAAAA with id 55646172

  AppComponent
    ✓ should create the app
    ✓ should have as title 'angular-tour-of-heroes'

Chrome 78.0.3904 (Mac OS X 10.15.1): Executed 2 of 2 SUCCESS (0.053 secs / 0.046 secs)
TOTAL: 2 SUCCESS
```

#### e2e test: AppComponent
```text
[13:48:13] I/launcher - Running 1 instances of WebDriver
[13:48:13] I/direct - Using ChromeDriver directly...
Jasmine started

Executed 0 of 0 specs SUCCESS in 0.004 sec.
[13:48:16] I/launcher - 0 instance(s) of WebDriver still running
[13:48:16] I/launcher - chrome #01 passed
```

This should tell us we are ready to start testing our application, using the provided unit- and e2e-test configuration !!!

## Setting Continious Integration
At this point, we can set up our continuous integration (CI) for building and test as we progress the application. CI will be our get keeper not to push code if the code fails to pass linting, unit or e2e-tests. 

Install `karma-spec-reporter` and `angular-cli-ghpages` in your `devDependecies`. The first will generate unit-test results in console, and the later will be used to deploy your app in github-pages. 

We will deploy the app from our local, using `npm run deploy`, hence we don't need to store our github auth-secret in Travis-ci.

#### package.json
```json
{
  "name": "angular-tour-of-heroes",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "lint": "ng lint",
    "test": "ng test",
    "e2e:update-webdriver": "npx webdriver-manager update --gecko=false",
    "e2e:local": "ng e2e",
    "e2e:travis": "npx protractor --capabilities.chromeOptions.args=--headless e2e/protractor.conf.js",
    "start": "ng serve",
    "build": "ng build",
    "deploy": "ng build --prod --base-href=\"/angular-tour-of-heroes/\" && npx ngh --dir=dist/angular-tour-of-heroes"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "8.2.14",
    "@angular/common": "8.2.14",
    "@angular/compiler": "8.2.14",
    "@angular/core": "8.2.14",
    "@angular/forms": "8.2.14",
    "@angular/platform-browser": "8.2.14",
    "@angular/platform-browser-dynamic": "8.2.14",
    "@angular/router": "8.2.14",
    "rxjs": "6.5.3",
    "tslib": "1.10.0",
    "zone.js": "0.10.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "0.803.19",
    "@angular/cli": "8.3.19",
    "@angular/compiler-cli": "8.2.14",
    "@angular/language-service": "8.2.14",
    "@types/jasmine": "3.4.6",
    "@types/jasminewd2": "2.0.8",
    "@types/node": "8.10.59",
    "angular-cli-ghpages": "0.6.0",
    "codelyzer": "5.2.0",
    "jasmine-core": "3.5.0",
    "jasmine-spec-reporter": "4.2.1",
    "karma": "4.4.1",
    "karma-chrome-launcher": "2.2.0",
    "karma-coverage-istanbul-reporter": "2.1.0",
    "karma-jasmine": "2.0.1",
    "karma-jasmine-html-reporter": "1.4.2",
    "karma-spec-reporter": "0.0.32",
    "protractor": "5.4.2",
    "ts-node": "7.0.1",
    "tslint": "5.20.1",
    "typescript": "3.5.3"
  }
}
```
Below is the script you need to run the application in the background, run your unit- and e2e-tests in headless Chrome using Travis-ci.

#### .travis.yml
```yaml
language: node_js
node_js:
  - "10.16.3"
addons:
  chrome: stable
branches:
  only:
    - master
before_script:
  - npm install -g @angular/cli
script:
  - ng lint
  - npm run start &
  - npm test -- --watch false --browsers ChromeHeadless
  - npm run e2e:update-webdriver
  - npm run e2e:travis
```
