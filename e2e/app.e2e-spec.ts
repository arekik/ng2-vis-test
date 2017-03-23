import { Ng2VisTestPage } from './app.po';

describe('ng2-vis-test App', () => {
  let page: Ng2VisTestPage;

  beforeEach(() => {
    page = new Ng2VisTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
