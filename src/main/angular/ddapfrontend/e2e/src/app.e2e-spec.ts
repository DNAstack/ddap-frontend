import { AppPage } from './app.po';

describe('ddapfrontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display sidenav title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('DDAP Frontend');
  });
});
