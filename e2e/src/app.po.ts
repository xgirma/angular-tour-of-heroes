import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppPage {
  body = element(by.css('body'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(EC.presenceOf(this.body), 5000) as Promise< void>;
  }

  getTitleText() {
    return element(by.css('#title')).getText() as Promise<string>;
  }
}
