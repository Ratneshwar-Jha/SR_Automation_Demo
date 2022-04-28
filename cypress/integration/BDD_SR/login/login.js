import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import LoginPage from '../../../support/objectrepoPOM/OR_LoginPage'

const loginpage = new LoginPage()
beforeEach(function(){
    cy.fixture('example').then(function(data)
    {
        this.data=data
    })
})

Given('User is at the login page.', function()
{
    cy.visit(this.data.URL)
})
When('User enters username & password and Click on Login Button.', function()
{
    loginpage.getUserNameEditBox().type(this.data.UserID)
    loginpage.getPasswordEditBox().type(this.data.Password)
    loginpage.getUserNameEditBox().click()   
    loginpage.getSubmitBtn().click()
    
})
Then('System Should Navigate to Initiator HomePage.', function()
{
    cy.xpath("//li[@class='notMobile']").then(CurntRole=>{
        if(CurntRole.is(':visible')){
            cy.xpath("//li[@class='notMobile']").then((resulText)=>{
                var Exrole =  resulText.text()
                assert.equal(Exrole,'Current Role: Initiator/Approver')
            })
        }
    })
    //function setLoationHref(){
        //window.location.href = 'https://wf6.myhcl.com//SmartRecruit/home/sotPopUp.htm'
    //}

    //cy.window().then((win) =>{
        //cy.stub(win,'open',setLoationHref)
        //}).as('404Window')
        //cy.get('@404Window').should('be.calledWith','https://wf6.myhcl.com//SmartRecruit/home/sotPopUp.htm')
})

