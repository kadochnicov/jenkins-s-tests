import { test, expect, Page, Locator} from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  label?: string;
  txt?: string;
  link?: string;
}

const elements: Elements[] = [
  {
    locator: (page: Page) => page.locator('.app-jenkins-logo'),
    label: 'logo',
    txt: 'Jenkins',
    link: '/',
  },
  {
    locator: (page: Page) => page.locator('.task:nth-child(1) a'),
    label: 'link for create new item',
    txt: 'New Item',
    link: '/view/all/newJob',
  },
  {
    locator: (page: Page) => page.locator('.task:nth-child(2) a'),
    label : 'link for history',
    txt: 'Build History',
    link: '/view/all/builds'
  },
  {
    locator: (page: Page) => page.locator('button#root-action-SearchAction'),
    label: 'search button',
  },
  {
    locator: (page: Page) => page.locator('#root-action-ManageJenkinsAction'),
    label: 'settings button',
  },
  {
    locator: (page: Page) => page.locator('#root-action-UserAction'),
    label: 'personal cabinet button',
  },
  {
    locator: (page: Page) => page.locator('#description-link'),
    label: 'button for add description',
    txt: 'Add description',
  }
]

test.describe('main page', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('http://localhost:8080');
    await page.locator('#j_username').click();
    await page.locator('#j_username').fill('kdchnkv');
    await page.locator('#j_password').click();
    await page.locator('#j_password').fill('12345678');
    await page.locator('.jenkins-button').click();
    await expect.soft(page.locator('#description-link')).toBeVisible();
  });
  test ('main elements not miss', async ({ page }) => {
    elements.forEach(({ locator, label }) => {
      test.step(`${label} exist!!`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    })
  });
  test ('button name is correct', async ({ page }) => {
    elements.forEach(({ locator, label ,txt}) => {
      if (txt) {
        test.step(`element "${label}" have text "${txt}"`, async() => {
          await expect.soft (locator(page)).toContainText(`${txt}`)
        })
      }
    })
  });
  test  ('button have correct link', async ({ page }) => {
    elements.forEach(({ locator, link}) => {
      if (link) {
        test.step(`chech ${link} link`, async() => {
          await expect.soft (locator(page)).toHaveAttribute('href', `${link}`)
        })
      }
    })
  });

})



