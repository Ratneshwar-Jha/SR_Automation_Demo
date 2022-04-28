// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPage from '../support/objectrepoPOM/OR_LoginPage'
const loginpage = new LoginPage()
Cypress.Commands.add('login', (Url,SAPid, password) => { 

    cy.visit(Url)
    loginpage.getUserNameEditBox().type(SAPid)
    loginpage.getPasswordEditBox().type(password)
    loginpage.getUserNameEditBox().click()
    loginpage.getSubmitBtn().click()

})
Cypress.Commands.add('SelectProjectListBoxValue', (divID, valuetoSelect) => { 

    cy.xpath("//div[@id='" + divID + "']/span[1]/input[2]").then(ProjectTextBox =>{
        if(ProjectTextBox.is(':visible')){
            cy.xpath("//div[@id='" + divID + "']/i[1]").then(clearicon =>{
                if(clearicon.is(':visible')){
                    cy.xpath("//div[@id='" + divID + "']/i[1]").click()
                }
            })
            cy.xpath("//div[@id='" + divID + "']/span[1]/input[2]").type(valuetoSelect)
        }
        cy.xpath("//div[@id='" + divID + "']/span[1]/div/div/div").then(objList =>{
            if(objList.is(':visible')){
                cy.xpath("//div[@id='" + divID + "']/span[1]/div/div/div").click()
            }
        })
    })
})
Cypress.Commands.add('SelectRequestType',(ReqType,subReqType)=>{

    cy.xpath("//input[@placeholder='--Select Requisition Type--']").then(RequestType =>{
        if(RequestType.is(':visible')){
            cy.xpath("//input[@placeholder='--Select Requisition Type--']").click()
            cy.xpath("//a[contains(@class,'firstChild') and contains(text(),'" + ReqType + "')]").then(RequType=>{
                if(RequType.is(':visible')){
                    cy.xpath("//a[contains(@class,'firstChild') and contains(text(),'" + ReqType + "')]").trigger('mouseover',{force: true})
                }
            })
            cy.xpath("//a[@class='ng-binding' and contains(text(),'" + subReqType + "')]").then(subRequType=>{
                if(subRequType.is(':visible')){
                    cy.xpath("//a[@class='ng-binding' and contains(text(),'" + subReqType + "')]").click({force: true})
                }
            })    
        }
    })
})
Cypress.Commands.add('SelectSkill',(skill)=>{
    cy.xpath("//div[@id='txtaddskill']").click()
    cy.xpath("//input[@id='txtERSskill']").type(skill)
    cy.xpath("//input[@id='txtERSskill']/following::div[1]/div[1]/div[1]").click()
    cy.xpath("//i[@class='icon-add addIcon openNextCol']").click()
    cy.xpath("//input[contains(@id,'primary')]/ancestor::td[1]").click()
    cy.xpath("//button[@onclick='SubmitERSSkill()']").click()
})
Cypress.Commands.add('SelectJob',(job)=>{
    cy.xpath("//i[@class = 'icon-filter prefix jobFilter' or contains(@class, 'icon-filter prefix jobFilter')]").click()
    cy.xpath("//input[@id='txtJob']").type(job)
    cy.xpath("//input[@id='txtJob']/following::div[1]/div[1]/div[1]").click()
    cy.xpath("//ul[@class='jobListUL']").click()
    cy.xpath("//button[@class='btn primary-button updatejob']").click()

})