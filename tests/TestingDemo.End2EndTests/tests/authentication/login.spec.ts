import { expect, test } from '@playwright/test';
import { UserFactory } from '../../factories/userFactory';
import { LoginPage } from '../../pageObjectModels/loginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('user should be able to login using valid username and password', async ({
    page,
  }) => {
    const { username, password } = UserFactory.createSysAdminUser();

    await loginPage.goto();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL(/Dashboard/);
  });
});
