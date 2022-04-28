import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import LoginPage from '../../../support/objectrepoPOM/OR_LoginPage'
import InitiatorPage from '../../../support/objectrepoPOM/OR_InitiatorPage'
import CreateNewRequisition from '../../../support/objectrepoPOM/OR_CreateNewReq'

const loginpage = new LoginPage()
const initiatorPage = new InitiatorPage()
const createNewRequisition = new CreateNewRequisition()
var reqnum
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
    // cy.xpath("//div[contains(@class,'radioQuestion radioButton Opportunity focused')]//label[contains(text(),'No')]").then(OppLessThan100 =>{
    //     if(OppLessThan100.is(':visible')){
    //         cy.xpath("//div[contains(@class,'radioQuestion radioButton Opportunity focused')]//label[contains(text(),'No')]").click()
    //     }
    // })
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
    //cy.get('.confirm').click()
    cy.xpath("//div[@class='sweet-alert  showSweetAlert visible']//h2[1]").then(SimilerPop =>{
        if(SimilerPop.is(':visible')){
            cy.get('.confirm').click()
        }
    })
    
    cy.on('window:alert',(text)=>{
        expect(text).to.contains('Requisition has been submitted successfully')
        reqnum = text.split("/2022/")[1]
        return reqnum
    })
    cy.wait(45000)  
    //cy.intercept('POST','https://qa1.myhcl.com/SimplifySR/Requisition/SaveJobInterviewerApprover',{}).as('popupmsg')
    //cy.wait('@popupmsg')
})

Then('system should create new requisition.',function()
{   
    //cy.login(this.data.URL,this.data.UserID,this.data.Password)  
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
})
Given('Login as SR user.',function()
{
    cy.login(this.data.URL,this.data.UserID,this.data.Password)
})

When('I input required details of Requisition and click on Close button.',function()
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

Then('system should close requisition.',function()
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
    cy.xpath("//a[@name='close']").click()
    cy.wait(100000)
    cy.xpath("//select[@id='Reason']").select(this.data.CloseReason)
    cy.xpath("//textarea[@id='Remarks']").type(this.data.Remark)
    cy.xpath("//input[@id='btnsubmit']").click()
    cy.removeAllListeners('window:alert')
    cy.prependListener('window:alert',(text1)=>{
        expect(text1).to.contains('Requisition has been Closed successfully.')
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
    cy.wait(60000)
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