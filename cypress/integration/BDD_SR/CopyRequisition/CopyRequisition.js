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

When('I input required details of Requisition and click on Copy button.',function()
{
    initiatorPage.getInitiatorActionLink().click()
    initiatorPage.getManageRequisitionLink().click()
    
    initiatorPage.getSearchRequisitiontext().type(this.data.ReqNoDV)
    initiatorPage.getSearchRequisitionButton().click()
    
})

Then('system should create new requisition.',function()
{
    
})