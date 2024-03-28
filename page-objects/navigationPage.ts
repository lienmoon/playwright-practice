import {Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase {
   
    // readonly formLayoutsMenuItem : Locator
    // readonly datePickerMenuItem : Locator
    // readonly smartTableMenuItem : Locator
    // readonly toastrMenuItem : Locator
    // readonly tooltipMenuItem : Locator

    constructor(page: Page){
        super(page)
    }

    //locator is unique and don't repeat 
    // constructor(page: Page){
    //     this.page = page
    //     this.formLayoutsMenuItem = page.getByText('Form Layouts')
    //     this.datePickerMenuItem = page.getByText('Datepicker')
    //     this.smartTableMenuItem = page.getByText('Smart Table')
    //     this.toastrMenuItem = page.getByText('Toastr')
    //     this.tooltipMenuItem = page.getByText('Tooltip')

    // }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(10)
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false"){
            await groupMenuItem.click()
        }
    }
}