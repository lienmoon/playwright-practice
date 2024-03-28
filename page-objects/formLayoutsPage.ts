import {Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class FormLayoutsPage extends HelperBase{
   
    // readonly usingTheGrid : Locator
    // readonly emailInput : Locator
    // readonly passwordInput : Locator
    // readonly optInput : Locator
    // readonly signInbutton : Locator

    constructor(page : Page){
        super(page)
        // this.usingTheGrid = this.page.locator('nb-card').filter({hasText:"Using the Grid"})
        // this.emailInput = this.usingTheGrid.getByRole('textbox',{name:"Email"})
    }

   /*  async submitUsingTheGridFormWithCredentialsAndSelectOption(){

        await this.emailInput.fill('test@test.com')
    } */

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox',{name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * 
     * @param name 
     * @param email 
     * @param rememberMe 
     */
   async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
   }
}