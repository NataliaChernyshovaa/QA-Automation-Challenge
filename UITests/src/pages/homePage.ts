import { Page } from "@playwright/test"
import { baseUrl } from "../support/constants"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {
    constructor (page: Page) {
      super(page)
  
      this.url = baseUrl
    }

    public get getInToutchButton () {
        return this.page.locator('header a[href="/contact/"]')
      }

    public get  ESGKPIEngineLink () {
        return this.page.locator('span.ux-menu-link__text:has-text("ESG KPI Engine")')
    }
}