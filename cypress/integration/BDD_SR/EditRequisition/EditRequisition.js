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

When('I input required details to Edit Update Requisition and click on Submit button.',function()
{
    initiatorPage.getInitiatorActionLink().click()
    initiatorPage.getManageRequisitionLink().click() 
    initiatorPage.getSearchRequisitiontext().type(this.data.ReqNoDV)
    initiatorPage.getSearchRequisitionButton().click()
    initiatorPage.getEditIcon().click()
    cy.wait(50000)
    initiatorPage.getGraIDTextArea().type(this.data.GraID)
    initiatorPage.getEditUpdateButton().click()
    cy.on('window:confirm',(text)=>{
        expect(text).to.contains('Are you sure you want to update this information ?')
    })
    
})

Then('system should Edit Update requisition.',function()
{
    cy.on('window:alert',(text)=>{
        expect(text).to.contains('Requisition has been Updated Successfully.')
    })
})