import { AppHeroes } from './heroes.po';

describe('AppHeroes', () => {
  let page: AppHeroes;

  beforeAll(() => {
    page = new AppHeroes();
    page.navigateTo();
  });

  it('should have title', () => {
    expect(page.getTitle()).toContain('Details');
  });

  it('should have id', () => {
    expect(page.getId()).toContain('id:');
  });

  it('should have name input', async () => {
    await page.setName('Foo');
    expect(page.getTitle()).toEqual('FOO Details');
  });
});
