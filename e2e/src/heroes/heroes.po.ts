import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppHeroes {
  body = element(by.css('body'));
  title = element(by.id('dtl'));
  id = element(by.id('hro-id'));
  name = element(by.css('#hro-name > label > input'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(EC.presenceOf(this.body), 5000) as Promise< void>;
  }

  getTitle() {
    return this.title.getText() as Promise<string>;
  }

  getId() {
    return this.id.getText() as Promise<string>;
  }
  setName(name) {
    this.name.clear();
    return this.name.sendKeys(name) as Promise<any>;
  }
}
