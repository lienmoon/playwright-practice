import {Page, expect} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class DatepickerPage extends HelperBase{   

    constructor(page: Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDayFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)

    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday) 
       
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
       
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDayFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDayFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US',{month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US',{month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').first().click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()

        }
        

        //await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in" }).getByRole('textbox',{name:"Email"}).click()


        //await this.page.locator('nb-card',{hasText:'Datepicker With Range'}).locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return dateToAssert

    }

}