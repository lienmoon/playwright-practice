
import {test, expect} from '@playwright/test'

//CONFIGURE for PARALLEL 
test.describe.configure({mode: 'parallel'})

test.beforeEach(async({page})=>{
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.describe('Form Layouts page', () => {
    // test.beforeEach(async({page}) => {
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()
    // })

    test.describe.configure({retries: 2})  // CONFIGURE TO RERUN 2 TIMES

    //Input Fields
    test('input fields',async ({page}, testInfo) => {

        if(testInfo.retry){

        }

        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()


        await usingTheGridEmailInput.fill('test2@test.com')

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()

        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    //Radio button
    test('radio buttons',async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"}).getByText

        // //get by Label
        // await usingTheGridForm.getByLabel('Option 1').check({force:true})

        // //get by Role
        // await usingTheGridForm.getByRole('radio',{name:"Option 1"}).check({force: true})

        // //generic assertion
        // const radioStatus = await usingTheGridForm.getByRole('radio',{name: "Option 1"}).isChecked()

        // expect(radioStatus).toBeTruthy()

        // //locator assertion
        // await expect(usingTheGridForm.getByRole('radio',{name:"Option 1"})).toBeChecked()

        //get locator
        const radioOption1 = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio',{name:"Option 1"})
        //check on radio option 1
        await radioOption1.check({force:true})
        //generic assertion
        const statusIsCheck = await radioOption1.isChecked()
        expect(statusIsCheck).toBeTruthy()

        const radioOption2 = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio',{name:"Option 2"})
        await radioOption2.check({force:true})
        
        expect(await radioOption1.isChecked()).toBeFalsy()

    })

    //checkboxes
    test.skip('checkboxes',async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        await page.getByRole('checkbox',{name:"Hide on click"}).uncheck({force:true})
        await page.getByRole('checkbox',{name: "Prevent arising of duplicate toast"}).check({force:true})

        const allBoxes = page.getByRole('checkbox')
        for (const box of await allBoxes.all()){
            await box.check({force:true})
            expect(await box.isChecked()).toBeTruthy()
        }
    })

    //drop down
    test.skip('dropdown',async({page}) => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()

        page.getByRole('list') //when the list has a UL tag
        page.getByRole('listitem')//when the list has LI tag

        //const optionList = page.getByRole('list').locator('nb-option')
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
        await optionList.filter({hasText: "Cosmic"}).click()

        const header = page.locator('nb-layout-header')

        const colors = {
            "Light":"rgb(255, 255, 255)",
            "Dark":"rgb(34, 43, 69)",
            "Cosmic":"rgb(50, 50, 89)"
        }

        await dropDownMenu.click()
        for (const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            await dropDownMenu.click()
        }

    })
})