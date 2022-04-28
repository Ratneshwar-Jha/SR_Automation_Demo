import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps";
import InitiatorPage from '../../../support/objectrepoPOM/OR_InitiatorPage'
import LoginPage from '../../../support/objectrepoPOM/OR_LoginPage'
import CreateNewRequisition from '../../../support/objectrepoPOM/OR_CreateNewReq'

const loginpage = new LoginPage()
const initiatorPage = new InitiatorPage()
const createNewRequisition = new CreateNewRequisition()
var reqnum
var app1
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

When('I input required details of Requisition and click on Submit button.',function()
{
    initiatorPage.getInitiatorActionLink().click()
    initiatorPage.getCreateNewRequisitionLink().click()
    //Screen 1
    cy.SelectProjectListBoxValue(this.data.divid,this.data.ProjectName)
    cy.SelectRequestType(this.data.ReqType,this.data.subReqtype)
    cy.SelectSkill(this.data.skill)
    cy.SelectJob(this.data.job)
    createNewRequisition.getEmployeeGroupCmb().select(this.data.EmployeeGroup,{force: true})
    createNewRequisition.getBandCmbox().select(this.data.Band,{force: true})
    createNewRequisition.getsubBandCmbox().select(this.data.SubBand,{force: true})
    createNewRequisition.getCountryCmbox().select(this.data.Country,{force: true})
    createNewRequisition.getCompanyCodeCmbox().select(this.data.CompanyCode,{force: true})
    createNewRequisition.getPersonalSubAreaCmbox().select(this.data.pSA,{force: true})
    createNewRequisition.getSecPersonalSubAreaCmbox().select(this.data.SecPSA,{force: true})
    createNewRequisition.getVacancyCounttextArea().type(this.data.Vacancy)
    createNewRequisition.getHirePanIndiaRdoButton().click({force: true})
    cy.get('#File').selectFile('cypress\\fixtures\\Doc.txt')
    createNewRequisition.getScrn1SaveasDraftButton().click()
    //Screen 2
    createNewRequisition.getExperienceCmBox().select(this.data.Exp,{force: true})
    createNewRequisition.getQualificationCmBox().select(this.data.Qualification,{force: true})
    createNewRequisition.getjobDesriptionTextArea().clear().type(this.data.JobDes)
    createNewRequisition.getDesignationCmBox().select(this.data.Designation,{force: true})
    createNewRequisition.getPACmBox().select(this.data.pA,{force: true})
    createNewRequisition.getSecPACmBox().select(this.data.SecPA,{force: true})
    createNewRequisition.getCWLCmBox().select(this.data.cWL,{force: true})
    createNewRequisition.getStateCmBox().select(this.data.state,{force: true})
    createNewRequisition.getCityCmBox().select(this.data.city,{force: true})
    createNewRequisition.getTPrdoButton().click({force: true})
    createNewRequisition.getS2SaveasdraftButton().click()
    //Screen 3
    createNewRequisition.getBillingTypeCmBox().select(this.data.BillingType,{force: true})   
    createNewRequisition.getOnBoardingDateCmBox().click()
    cy.get(':nth-child(5) > :nth-child(6)').click()
    cy.get('#interviewerid1TP1').type(this.data.Interviewer1)
    cy.get('#interviewerid2TP1').type(this.data.Interviewer2)
    cy.get('#SaveSubmit').click()
    cy.xpath("//div[@class='sweet-alert  showSweetAlert visible']//h2[1]").then(SimilerPop =>{
        if(SimilerPop.is(':visible')){
            cy.get('.confirm').click()
        }
    })  
    cy.prependListener('window:alert',(text)=>{
        expect(text).to.contains('Requisition has been submitted successfully')
        reqnum = text.split("/2022/")[1]
    })  
    cy.wait(45000)  
})

Then('Approver should be able to Referback requisition.',function()
{   
    initiatorPage.getInitiatorActionLink().click()
    initiatorPage.getManageRequisitionLink().click()   
    initiatorPage.getSearchRequisitiontext().type(reqnum)
    initiatorPage.getSearchRequisitionButton().click()
    cy.get('#viewReq').then(SrchResult=>{
        if(SrchResult.is(':visible')){
            cy.get('#viewReq').then((resulText)=>{
                var Ex =  resulText.text().split("/2022/")[1]
                assert.equal(Ex,reqnum)
            })
        }
    })
    cy.get('#pendWith').click()
    cy.xpath("//table[@class='table table-striped table-bordered table-hover example no-footer']/tbody/tr[1]/td[2]").then((AppName1)=>{
        app1 = AppName1.text().split("[")[1].replace("]\n                                        ","")
        //assert.equal(App1,'10100461')
        //return app1
        cy.login(this.data.URL,app1,this.data.Password)
    })
    //cy.login(this.data.URL,app1,this.data.Password) Approved
    cy.xpath("//a[text()='Approver Actions']").click()
    cy.xpath("//a[text()='My Approvals']").click()
    cy.get('input#ReqNo').type(reqnum)
    cy.get('input#SearchReq').click()
    cy.xpath("//a[@id='edit' and @class='modal-link btn']/span[1]").click()
    cy.wait(60000)
    cy.get('select#Action').select('Refer Back')
    cy.get('select#Reason').select('SR Refer Back - Incorrect requirements /details')
    cy.get('textarea#Remarks').type(this.data.Remark)
    cy.get('input#btnsubmit').click()
    // cy.removeAllListeners('window:alert')
    // cy.prependListener('window:alert',(text1)=>{
    //     expect(text1).to.contains('Requisition has been Closed successfully.')
    // })
    // cy.login(this.data.URL,this.data.UserID,this.data.Password)
    // initiatorPage.getInitiatorActionLink().click()
    // initiatorPage.getManageRequisitionLink().click()   
    // initiatorPage.getSearchRequisitiontext().type(reqnum)
    // initiatorPage.getSearchRequisitionButton().click()
    // cy.get('#viewReq').then(SrchResult=>{
    //     if(SrchResult.is(':visible')){
    //         cy.get('#viewReq').then((resulText)=>{
    //             var Ex =  resulText.text().split("/2022/")[1]
    //             assert.equal(Ex,reqnum)
    //         })
    //     }
    // })
})
