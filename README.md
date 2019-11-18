# :cat: :dog: Testing Angular Tour Of Heroes
Exploring the process of the unit- and e2e-testing the Tour of Heroes application. 
Focusing on the connection between application progression and test development changes.

## Bootstraping
AppComponent is the application shell. There is not much to test, at this point. 
The default unit- and e2e-tests generated by the `ng new` command contains a few guiding sanity-tests, as shown below.

### :cat: unit test: app.component.spec.ts
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

### :dog: e2e test: app.e2e-spec.ts
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

### :cat: unit test: result: app.component.spec.ts
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

### :dog: e2e test: result: app.e2e-spec.ts
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

### :cat: unit test: app.component.spec.ts
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

### :dog: e2e test: app.e2e-spec.ts
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

### :cat: unit test: result: app.component.spec.ts
```text
17 11 2019 13:50:47.437:INFO [Chrome 78.0.3904 (Mac OS X 10.15.1)]: 
Connected on socket BxH0NdUALyuLhlXKAAAA with id 55646172

  AppComponent
    ✓ should create the app
    ✓ should have as title 'angular-tour-of-heroes'

Chrome 78.0.3904 (Mac OS X 10.15.1): Executed 2 of 2 SUCCESS (0.053 secs / 0.046 secs)
TOTAL: 2 SUCCESS
```

### :dog: e2e test: reult: app.e2e-spec.ts
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

Install `karma-spec-reporter` and `angular-cli-ghpages` in your `devDependecies`. The first will generate unit-test results in console, and the later will be used to deploy your app in github-pages. `karma-spec-reporter` needs to required in your `karma.conf.js` and also add as a reporter, see [here](https://github.com/xgirma/angular-tour-of-heroes/blob/master/karma.conf.js).

We will deploy the app from our local, using `npm run deploy`, hence we don't need to store our github auth-secret in Travis-ci.

### package.json
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
    "build:hgpages": "ng build --prod --base-href=\"/angular-tour-of-heroes/\"",
    "deploy": "npm run build:hgpages && npx ngh --dir=dist/angular-tour-of-heroes"
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
Below is the script you need to run the application in the background, run your unit- and e2e-tests in headless Chrome using Travis-ci.If you want Travis-ci also make the Continous Deplymen (CD) add the `deploy` script as documented [here](https://docs.travis-ci.com/user/deployment/pages/) and your github token in the build configuration parameters. 

### .travis.yml
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

## AppComponent (v0.1)
Our App begins here. First thing we change the title. See details [here](https://angular.io/tutorial/toh-pt0)

### :cat: unit test: app.component.ts
```diff
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
-  title = 'angular-tour-of-heroes';
+  title = 'Tour of Heroes';
}
```

### :pig: view: app.component.html
```html
<h1>{{title}}</h1>
```

As expected, the unit test assertion we have for the title fails. We could simply update the expected value with the new title and test will pass. 

### :cat: unit test: app.component.spec.ts
```typescript
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

  it(`should have as title 'Tour of Heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tour of Heroes');
  });
});
```

For the e2e-test this is the time to add a test for the title. First we will element seelctor and text 'getter' in the `page-object` then add assertion for the new title in our test (`spec`). 

### :dog: e2e test: app.po.ts
```diff
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
-    return element(by.css('app-root .content span')).getText() as Promise<string>;
+    return element(by.css('h1')).getText() as Promise<string>;
  }
}
```

### :dog: e2e test: app.e2e-spec.ts
```diff
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

- describe('workspace-project App', () => {
+ describe('AppComponent', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

+  it('should display title', () => {
+    page.navigateTo();
+    expect(page.getTitleText()).toEqual('Tour of Heroes');
+  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
```

Both your unit- and e2e-tests are passing. Now you could run your app and see the title. 

## AppComponent(0.2), HeroesComponent(0.1)
Now we will use HeroesComponent to show hero information and insert that in the application-shell(the AppComponent). See details [here](https://angular.io/tutorial/toh-pt1#the-hero-editor)

Generate the HeroesComponent; unit and e2e-test are stil passing. Let us build the `HeroesComponent`.

### :cow: component: heroes.component.ts
```diff
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
+  hero = 'Windstorm';

  constructor() { }

  ngOnInit() {
  }

}
```

### :pig: view: heroes.component.html
```diff
- <p>heroes works!</p>
+ {{hero}}
```
Then, insert `HeroesComponent` inside the parent `AppComponent`.

### :pig: view: app.component.html
```diff
<h1>{{title}}</h1>
+ <app-heroes></app-heroes>
```

Note, we introduce a change to the `AppComponent` that cause all unit-tests for the `AppComponent` to fail. 

### :cat: unit test: app.component.spec.ts
```text
1) should create the app
     AppComponent
     1. If 'app-heroes' is an Angular component, then verify that it is part of this module.
2. If 'app-heroes' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("<h1>{{title}}</h1>
[ERROR ->]<app-heroes></app-heroes>
'app-heroes' is not a known element:
1. If 'app-heroes' is an Angular component, then verify that it is part of this module.
2. If 'app-heroes' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("<h1>{{title}}</h1>
[ERROR ->]<app-heroes></app-heroes>
```

One test for the `HeroesComponent` pass. At this point, your application works fine. Run it, there will be no application error. Because `ng generate component heroes` updates `app.module.ts` to add `HeroesComponent` in to the application declaration.

We just need to do the same with our tests, but we have to do enter that manually. 

### :cat: unit test: app.component.spec.ts
```diff
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
+ import { HeroesComponent } from './heroes/heroes.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
+        HeroesComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tour of Heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tour of Heroes');
  });
});
```

  > Either unit- and/or e2e-tests could fail for a number of reasons that is not related to your
  > application feature. Therfore, a test failour does not always correlate with application failour.

Now all tests are passing. Let us add additional unit- and e2e-tests for the `HeroesComponent`. 

At this point we will cleanup the existing `AppComponent` test, to reduce repetion and also add one more test for the addition of the child component (`HeroesComponent`).

Compare the above snippet with the below.

### :cat: unit test: app.component.spec.ts
```typescript
import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeroesComponent
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
});
```
Result of the excution

### :cat: unit test: result: app.component.spec.ts, heroes.component.spec.ts
```text
17 11 2019 18:35:30.532:INFO [Chrome 78.0.3904 (Mac OS X 10.15.1)]: 
Connected on socket 5DhdOfd_v_yu29WHAAAA with id 67124381

  AppComponent
    ✓ should have app-heroes
    ✓ should create the app
    ✓ should have as title 'Tour of Heroes'

  HeroesComponent
    ✓ should create

Chrome 78.0.3904 (Mac OS X 10.15.1): Executed 4 of 4 SUCCESS (0.151 secs / 0.138 secs)
TOTAL: 4 SUCCESS
```

As shown above, the `HeroesComponent` have one default test and it is passing. We need to add one more test to 'hero' bing rendered. 

### :cat: unit test: heroes.component.spec.ts
```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
+  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
 +   compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

+  it(`should have 'Windstorm' as hero`, () => {
+    expect(compiled.querySelector('app-heroes').textContent).toEqual(component.hero);
+  });
});
```

When we run the test, the test will fail, because the `querySelector` could not find the element.

### :cat: unit test: heroes.component.spec.ts
```text
1) should have 'Windstorm' as hero
     HeroesComponent
     TypeError: Cannot read property 'textContent' of null
    at <Jasmine>
```

We need to add a Paragraph HTML tag to the content we want to search for. 

  > Oftten we need to update a working application code to make it testable. Adding IDs, class-names,
  > or HTML tags are common practice. 
  
### :pig: view: heroes.component.html
```diff
- {{hero}}
+ <p>{{hero}}</p>
```
Updated test with `compiled.querySelector('p')` help us to find the element, hence the assertion passes. 

### :cat: unit test: heroes.component.spec.ts
```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'Windstorm' as hero`, () => {
    expect(compiled.querySelector('p').textContent).toEqual(component.hero);
  });
});
```

Unit test pass, done. Let us add e2e tests to test the hero name.

### :dog: e2e test: heroes.po.ts
```typescript
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppHeroes {
  body = element(by.css('body'));
  name = element(by.css('app-heroes > p'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(EC.presenceOf(this.body), 5000) as Promise< void>;
  }

  getName() {
    return this.name.getText() as Promise<any>;
  }
}
```

### :dog: e2e test: heroes.e2e-spec.ts
```typescript
import { AppHeroes } from './heroes.po';

describe('AppHeroes', () => {
  let page: AppHeroes;

  beforeAll(() => {
    page = new AppHeroes();
    page.navigateTo();
  });

  it(`should have name 'Windstorm'`, () => {
    expect(page.getName()).toContain('Windstorm');
  });
});
```
Test excution result
### :dog: e2e test: reult: app.e2e-spec.ts, heroes.e2e-spec.ts
```text
Jasmine started

  AppComponent
    ✓ should display title

  AppHeroes
    ✓ should have name 'Windstorm'

Executed 2 of 2 specs SUCCESS in 1 sec.
[19:33:03] I/launcher - 0 instance(s) of WebDriver still running
[19:33:03] I/launcher - chrome #01 passed
```

## AppComponent(0.2), HeroesComponent(0.2)
So far the app only shows the hero name. Here, we want to display additional hero information. See details [here](https://angular.io/tutorial/toh-pt1#create-a-hero-class)

### :caw: component: heroes.component.ts
```diff
import { Component, OnInit } from '@angular/core';

+ import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
-  hero = 'Windstorm';
+  hero: Hero = {
+    id: 1,
+    name: 'Windstorm'
+  };

  constructor() { }

  ngOnInit() {
  }
}
```
### :pig: view: heroes.component.html
```diff
- <p>{{hero}}</p>
+ <h2>{{hero.name | uppercase}} Details</h2>
+ <div><span>id: </span>{{hero.id}}</div>
+ <div><span>name: </span>{{hero.name}}</div>
```
After updating the code, as shown above both unit- and e2e-tests for the `HeroesComponent` fails for not finding the original hero content in the view.

### :cat: unit test: result: heroes.component.spec.ts
```text
HeroesComponent
    ✗ should have 'Windstorm' as hero
        TypeError: Cannot read property 'textContent' of null
            at <Jasmine>
```

### :dog: e2e test: result: heroes.e2e-spec.ts
```text
AppHeroes
    ✗ should have name 'Windstorm'
      - Failed: No element found using locator: By(css selector, app-heroes > p)
          at elementArray
```

First let us add IDs for the newer elements just introduced to make them accesssable for testing. 

### :pig: view: heroes.component.htm
```html
<h2 id="dtl">{{hero.name | uppercase}} Details</h2>
<div id="hro-id"><span>id: </span>{{hero.id}}</div>
<div id="hro-name"><span>name: </span>{{hero.name}}</div>
```
Now we can write unit- and e2e-tests for testing the added hero title, id, and name.

### :cat: unit test: heroes.component.spec.ts
```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have hero title`, () => {
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual((component.hero.name).toUpperCase() + ' Details');
  });

  it(`should have hero id`, () => {
    expect(compiled.querySelector('#hro-id').textContent)
      .toEqual('id: ' + (component.hero.id));
  });

  it(`should have hero name`, () => {
    expect(compiled.querySelector('#hro-name').textContent)
      .toEqual('name: ' + (component.hero.name));
  });
});
```

### :cat: unit test: result: heroes.component.spec.ts
```text
17 11 2019 20:57:28.222:INFO [Chrome 78.0.3904 (Mac OS X 10.15.1)]: 
Connected on socket xSYvLvZLsl7yTbN4AAAA with id 50080976

  AppComponent
    ✓ should create the app
    ✓ should have as title 'Tour of Heroes'
    ✓ should have app-heroes

  HeroesComponent
    ✓ should create
    ✓ should have hero id
    ✓ should have hero title
    ✓ should have hero name

Chrome 78.0.3904 (Mac OS X 10.15.1): Executed 7 of 7 SUCCESS (0.223 secs / 0.181 secs)
TOTAL: 7 SUCCESS
```

### :dog: e2e test: heroes.po.ts
```typescript
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppHeroes {
  body = element(by.css('body'));
  title = element(by.id('dtl'));
  id = element(by.id('hro-id'));
  name = element(by.id('hro-name'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(EC.presenceOf(this.body), 5000) as Promise< void>;
  }

  getTitle() {
    return this.title.getText() as Promise<any>;
  }

  getId() {
    return this.id.getText() as Promise<any>;
  }

  getName() {
    return this.name.getText() as Promise<any>;
  }
}
```

### :dog: e2e test: heroes.e2e-spec.ts
```typescript
import { AppHeroes } from './heroes.po';

describe('AppHeroes', () => {
  let page: AppHeroes;
  const hero = {
      id: 1,
      name: 'Windstorm'
  };

  beforeAll(() => {
    page = new AppHeroes();
    page.navigateTo();
  });

  it(`should have title`, () => {
    expect(page.getTitle()).toContain(`${(hero.name).toUpperCase()} Details`);
  });

  it(`should have id`, () => {
    expect(page.getId()).toContain(`id: ${hero.id}`);
  });

  it(`should have name`, () => {
    expect(page.getName()).toContain(`name: ${hero.name}`);
  });
});
```

### :dog: e2e test: result: heroes.e2e-spec.ts
```text
Jasmine started

  AppComponent
    ✓ should display title

  AppHeroes
    ✓ should have title
    ✓ should have id
    ✓ should have name

Executed 4 of 4 specs SUCCESS in 3 secs.
```

All tests pass.

## AppComponent(0.2), HeroesComponent(0.3)
Two-way data binding. We will add an input box to be able to edit the hero name. See details [here](https://angular.io/tutorial/toh-pt1#edit-the-hero)

```diff
<h2 id="dtl">{{hero.name | uppercase}} Details</h2>
<div id="hro-id"><span>id: </span>{{hero.id}}</div>
- <div id="hro-name"><span>name: </span>{{hero.name}}</div>
+ <div id="hro-name">
+  <label>name:
+    <input [(ngModel)]="hero.name" placeholder="name"/>
+  </label>
+ </div>
```
After the above change in the view, your application, unit- and e2e-test will fail for a good reason. Check your browser console to see why your application is failing to render the view. Below is an identical error message from the unit test.

```text
Failed: Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'. ("
<div id="hro-name">
  <label>name:
    <input [ERROR ->][(ngModel)]="hero.name" placeholder="name"/>
  </label>
</div>
"): ng:///DynamicTestModule/HeroesComponent.html@4:11
```
Add `FormsModule` in the `app.module.ts` as shown [here](https://angular.io/tutorial/toh-pt1#the-missing-formsmodule). We also need to add the same in the `heroes.componet.spec.ts` and its parent shell component test `app.component.spec.ts`.

### :cat: unit test: heroes.component.spec.ts
```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
+ import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
+     imports: [ FormsModule ],
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have hero title`, () => {
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual((component.hero.name).toUpperCase() + ' Details');
  });

  it(`should have hero id`, () => {
    expect(compiled.querySelector('#hro-id').textContent)
      .toEqual('id: ' + (component.hero.id));
  });

  it(`should have hero name`, () => {
    expect(compiled.querySelector('#hro-name').textContent)
      .toEqual('name: ' + (component.hero.name));
  });
});
```

### :cat: unit test: app.component.spec.ts
```diff
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
+ import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
+     imports: [ FormsModule ],
      declarations: [
        AppComponent,
        HeroesComponent
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
});
```

At this point for both unit- and e2e-tests, only the single test for the name field should fail, since its actual markup is changed. We will update that test. 

  > Unit tests run in random order. It is important that the change made in one test should be tear-down
  > after each test run, when possible. Or a test that could potentially polute other test, shoul be keept
  > in a separate describe block.
  
### :cat: unit test: heroes.component.spec.ts
```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
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
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have hero title`, () => {
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual((component.hero.name).toUpperCase() + ' Details');
  });

  it(`should have hero id`, () => {
    expect(compiled.querySelector('#hro-id').textContent)
      .toEqual('id: ' + (component.hero.id));
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
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it(`should have editable hero name`, () => {
    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
    inputBox.value = 'Dr. Nice';
    inputBox.dispatchEvent(new Event('input'));

    expect(inputBox.value).toBe('Dr. Nice');
    fixture.detectChanges();

    // two way binding
    expect(compiled.querySelector('#dtl').textContent)
      .toEqual((component.hero.name).toUpperCase() + ' Details');
  });
});
```
Notice how the above test uses a separate describe block, because the two-way binding test will change the `component.hero.name` property. 

### :cat: unit test: result: heroes.component.spec.ts
```text
17 11 2019 21:43:39.565:INFO [Chrome 78.0.3904 (Mac OS X 10.15.1)]: 
Connected on socket SPvsaEf-8W7L0e2JAAAA with id 61592508

  HeroesComponent: input
    ✓ should have editable hero name

  HeroesComponent
    ✓ should create
    ✓ should have hero title
    ✓ should have hero id

  AppComponent
    ✓ should have app-heroes
    ✓ should have as title 'Tour of Heroes'
    ✓ should create the app

Chrome 78.0.3904 (Mac OS X 10.15.1): Executed 7 of 7 SUCCESS (0.306 secs / 0.27 secs)
TOTAL: 7 SUCCESS
```

The change we need to make on the e2e-test is minimal as shown below.

### :dog: e2e test: heroes.po.ts
```diff
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppHeroes {
  body = element(by.css('body'));
  title = element(by.id('dtl'));
  id = element(by.id('hro-id'));
-  name = element(by.id('hro-name'));
+  name = element(by.css('#hro-name > label > input'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(EC.presenceOf(this.body), 5000) as Promise< void>;
  }

  getTitle() {
    return this.title.getText() as Promise<any>;
  }

  getId() {
    return this.id.getText() as Promise<any>;
  }

-  getName() {
-    return this.name.getText() as Promise<any>;
-  }

+  setName(name) {
+    this.name.clear();
+    return this.name.sendKeys(name) as Promise<any>;
+  }
}
```

### :dog: e2e test: heroes.e2e-spec.ts
```diff
import { AppHeroes } from './heroes.po';

describe('AppHeroes', () => {
  let page: AppHeroes;
  const hero = {
      id: 1,
      name: 'Windstorm'
  };

  beforeAll(() => {
    page = new AppHeroes();
    page.navigateTo();
  });

  it(`should have title`, () => {
    expect(page.getTitle()).toContain(`${(hero.name).toUpperCase()} Details`);
  });

  it(`should have id`, () => {
    expect(page.getId()).toContain(`id: ${hero.id}`);
  });

-  it(`should have name`, () => {
-    expect(page.getName()).toContain(`name: ${hero.name}`);
-  });

+  it('should have editable hero name', async () => {
+    await page.setName('Dr. Nice');
+    expect(page.getTitle()).toEqual('DR. NICE Details');
+  });
});
```

### :dog: e2e test: result: heroes.e2e-spec.ts
```text
Jasmine started

  AppComponent
    ✓ should display title

  AppHeroes
    ✓ should have title
    ✓ should have id
    ✓ should have editable hero name

Executed 4 of 4 specs SUCCESS in 2 secs.
```

## AppComponent(0.2), HeroesComponent(0.4)
So far we have shown a single hero, now let us display a list of heroes. Able to edit only the `selected` hero. See details [here](https://angular.io/tutorial/toh-pt2)

### :cat: unit test: heroes.component.spec.ts
```diff
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
+ import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
-  hero: Hero = {
-    id: 1,
-    name: 'Windstorm'
-  };

-  heroes = HEROES;
+  selectedHero: Hero;

  constructor() { }

  ngOnInit() {
  }

+  onSelect(hero: Hero): void {
+    this.selectedHero = hero;
+  }
}
```

### :pig: view: heroes.component.html
```diff
- <h2 id="dtl">{{hero.name | uppercase}} Details</h2>
- <div id="hro-id"><span>id: </span>{{hero.id}}</div>
- <div id="hro-name">
-  <label>name:
-    <input [(ngModel)]="hero.name" placeholder="name"/>
-  </label>
- </div>

+ <h2>My Heroes</h2>
+ <ul class="heroes">
+  <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
+    <span class="badge">{{hero.id}}</span> {{hero.name}}
+  </li>
+ </ul>

+ <div *ngIf="selectedHero">
+  <h2>{{selectedHero.name | uppercase}} Details</h2>
+  <div><span>id: </span>{{selectedHero.id}}</div>
+  <div>
+    <label>name:
+      <input [(ngModel)]="selectedHero.name" placeholder="name"/>
+    </label>
+  </div>
+ </div>
```

After this change almost all of the test for `HeroesComponent` should fail. Tests for `AppComponent` should work as before. 
Below we will update the unit- and e2e-tests to adapt this change. 

We will classify the unit test for the `HeroComponent` in to three parts:

  1. the inital state, where we have no selected hero
  2. the state we get details after we select a hero
  3. the state we get when we modify a selected hero
  
### :cat: unit test: heroes.component.spec.ts (part 1)
```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

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
  });

  it('should not have selected hero', () => {
    expect(component.selectedHero).not.toBeDefined();
    expect(compiled.querySelector('#details')).toBe(null);
  });
});
```

