import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"


test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('click layouts', async({page})=> {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Lien test', 'lien@email', true)

    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})

    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineform.png'})

    await pm.navigateTo().datepickerPage()

    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(15,17)

})


