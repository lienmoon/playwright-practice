import {test, expect} from '@playwright/test'

test.beforeEach(async( {page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

    //set timeout for every test 

    testInfo.setTimeout(testInfo.timeout + 2000)

})

test.skip('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')

        // await successButton.waitFor({state: "attached"})

        // const text = await successButton.allTextContents()

        // expect(text).toEqual('Data loaded with AJAX get request.')

        await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})

test.skip('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //wait for element
    await page.waitForSelector('.bg-success')

    //wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    const text = await successButton.allTextContents()

    expect(text).toEqual('Data loaded with AJAX get request.')
})

test.skip('timeout', async({page})=>{
    //test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
   
    await successButton.click({timeout: 16000})


    //global timeout ~ timeout for the whole test run

    //test timeout ~ timeout for single test 

    //action timeout ~ click(), fill(), textContent(), 

    //navigation timeout ~ page.goto('/)

    //expect timeout
    //await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})