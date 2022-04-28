import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps";
import InitiatorPage from '../../../support/objectrepoPOM/OR_InitiatorPage'
import LoginPage from '../../../support/objectrepoPOM/OR_LoginPage'

const loginpage = new LoginPage()
const initiatorPage = new InitiatorPage()
beforeEach(function(){
    cy.fixture('example').then(function(data)
    {
        this.data=data
    })
})
Given('Login as SR user.',function()
{
    cy.login(this.data.URL,this.data.UserID,this.data.Password)
    
})

When('I input required details of drop Vacancy and click on submit button.',function()
{
    initiatorPage.getInitiatorActionLink().click()
    initiatorPage.getManageRequisitionLink().click()   
    initiatorPage.getSearchRequisitiontext().type(this.data.ReqNoDV)
    initiatorPage.getSearchRequisitionButton().click()  
    initiatorPage.getDropVacancyicon().click()
    initiatorPage.getDropVacancyReasonDropdown().select(this.data.DropVReason,{force: true})
    initiatorPage.getDropVacancyRemarkText().type(this.data.Remark)
    initiatorPage.getDropVacancySubmitButton().click()
    
})

Then('system should Reduce vacancy of the requisition.',function()
{
    cy.on('window:alert',(text)=>{
        expect(text).to.contains('Vacancy has been dropped Successfully!!')
    })    
})