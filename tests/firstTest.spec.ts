import {test,expect} from '@playwright/test'

test.beforeEach('the first test', async ({page}) => {
    await page.goto('/')
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()

})


test('User facing locators', async ({page}) => {
    await page.goto('/')
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
   // await page.getByRole('textbox',{name:"Email"}).first().click()
})

test('Locator syntax rules', async ({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    page.locator('#inputEmail1')

    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width"]')

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle[]')

    //by Xpath
    page.locator('.//')

    //by partial text match
    page.locator(':text("")')

    page.locator(':text("Using")')

    page.locator(':text-is("Using the Grid")')
})

test('User facing locator',async ({page})=> {
    await page.getByRole('textbox',{name:"Email"}).first().click()
    await page.getByRole('button',{name:"Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

})

test('locating child elements',async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()

    //combination of locator & user facing locator
    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()


})

test('locating parent elements',async({page})=>{

    //await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('button').click()

    await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()


    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name:"Email"}).click()


    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in" }).getByRole('textbox',{name:"Email"}).click()


    
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()

})

test('reusing locator', async({page})=>{
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailForm = basicForm.getByRole('textbox',{name:"Email"})


    await emailForm.fill('test@test.com')
    await basicForm.getByRole('textbox',{name:"Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailForm).toHaveValue('test@test.com')
})

test('extracting values',async({page})=> {
    //sing test value
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttonText = await basicForm.getByRole('button').textContent()

     expect(buttonText).toEqual('Submit')

     //all text value
     const allRadioButtonLabel = await page.locator('nb-radio').allTextContents()
     expect(allRadioButtonLabel).toContain('Option 1')

     //input value
     const emailForm = basicForm.getByRole('textbox',{name:"Email"})
     await emailForm.fill('test@test.com')
     const emailValue = await emailForm.inputValue()
     expect(emailValue).toEqual('test@test.com')

     const buttonText1 = await basicForm.getByRole('button').textContent()

})

test('assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText:"Basic Form"}).getByRole('button')

    //General assertion
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion --> to keep continue if assertion is failed
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

})