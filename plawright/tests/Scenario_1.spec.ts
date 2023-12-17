/**
 * Braulio Batista
 * 
 * December 2023
 */

import { test, expect, request } from '@playwright/test';
import { OurTeamPage } from './pages/our-team';

test.describe.parallel.only('QA Automation Assessment', () => {
  let ourTeamPage: OurTeamPage;
  // data
  const dataApi = require('../data-source/api-data.json');

  test.beforeEach(async ({ page }) => {
    ourTeamPage = new OurTeamPage(page);
  });

  test('Validate that we have tech stacks in the following API Call(https://api.25friday.com/v1/WebSite/techstacks)', async ({ page }) => {
    // Navigate to page
    await page.goto(dataApi.webSiteUrl)

    // Create a context that will issue http requests.
    let context = await request.newContext({
      baseURL: dataApi.url
    });

    const response = await context.get(dataApi.techStacksResources, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    expect(response.status()).toBe(dataApi.statusCode);
    const responseBody = JSON.parse(await response.text());

    // Check if stacks are hidden  
    // Assertions
    await ourTeamPage.scrollToBottom(); // in this case is necessary move the coursor to the button,
    for (const value of responseBody) {
      expect(await ourTeamPage.getTeckStackByRole(value)).toBe(value.label);
    }
  });
});