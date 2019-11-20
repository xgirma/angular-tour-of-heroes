import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppHeroes {
  body = element(by.css('body'));
  title = element(by.id('dtl'));
  id = element(by.id('hro-id'));
  name = element(by.css('#hro-name > label > input'));
  selected = element(by.css('li.selected'));

  navigateTo() {
    browser.get(browser.baseUrl + 'heroes');
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

  selectHero(index) {
    const heroes = element.all(by.css('.badge'));
    return heroes.get(index).click() as Promise<void>;
  }

  getSelected() {
    return this.selected.getText() as Promise<string>;
  }
}
