import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager" // Import pageManager
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page', async({page})=>{
    const pm = new PageManager(page)               // USE PAGE MANAGER 
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()    
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parameterized methods', async({page})=> {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('lien@test.email','Welcome1','Option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    console.log(randomFullName)
})
