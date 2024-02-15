import test, { expect } from '@playwright/test'
import { HomePage } from "../src/pages/homePage";
import { NAVIGATION_ITEMS } from '../src/support/types';
import { contactUrl, esgKpiEngineUrl } from '../src/support/constants';
import { ContactFormPage } from '../src/pages/contactFormPage';
import { unvalidEmail } from '../src/support/emailTestData';
import { errorValidatinEmailMessage } from '../src/support/errorMessages';
import { ESGKPIEnginePage } from '../src/pages/ESGKPIEnginePage';

test.describe('Official Site Tests', () => {
    let homePage: HomePage;
    let contactFormPage: ContactFormPage
    let esgkpiEnginePage : ESGKPIEnginePage
  
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page)
      contactFormPage = new ContactFormPage(page)
      esgkpiEnginePage = new ESGKPIEnginePage(page)
  
      await homePage.visitPage()
    })
  
    test.afterEach(async ({ page }) => {
      await page.close()
    })
  
    test('Should verify if Get in touch button has a yellow color', async () => {
        const color = await homePage.getInToutchButton.evaluate((item) => {
        return window.getComputedStyle(item).getPropertyValue("background-color")
      })
  
      expect(color).toBe('rgb(255, 212, 60)')

    });

    test (`Should verify if a user has been redirected to the ${esgKpiEngineUrl} page`, async () => {
        await homePage.navigationBar.getNavigationItemByText(NAVIGATION_ITEMS.FINANCE_ESG).hover()
        await homePage.ESGKPIEngineLink.click()
      
        expect(await homePage.getUrl()).toBe(esgKpiEngineUrl);
        expect (esgkpiEnginePage.h1ElementESGKPIEngine).toBeVisible
      });

      test (`Should Verify if validation message will appear if email is unvalid`, async () => {
        await homePage.getInToutchButton.click();
        expect(await contactFormPage.getUrl()).toBe(contactUrl);
        
        await contactFormPage.emailField.fill(unvalidEmail)
        await expect (contactFormPage.emailErrorLabel).toContainText(errorValidatinEmailMessage)
      }); 
 
  })