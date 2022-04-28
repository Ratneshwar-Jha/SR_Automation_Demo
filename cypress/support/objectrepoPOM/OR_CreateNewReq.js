class CreateNewRequisition
{
 //Page 1   
    getRequestType()
    {
        return cy.xpath("//input[@placeholder='--Select Requisition Type--']")
    }
    getEmployeeGroupCmb()
    {
        return cy.xpath("//select[@id='empG']")
    }
    getBandCmbox()
    {
        return cy.xpath("//select[@id='BandId']")
    }
    getsubBandCmbox()
    {
        return cy.xpath("//select[@id='subbandid']")
    }
    getCountryCmbox()
    {
        return cy.xpath("//select[@id='country']")
    }
    getCompanyCodeCmbox()
    {
        return cy.xpath("//select[@id='ddlCompanyCode']")
    }
    getPersonalSubAreaCmbox()
    {
        return cy.xpath("//select[@id='PersonalSubAreaID']")
    }
    getSecPersonalSubAreaCmbox()
    {
        return cy.xpath("//select[@id='SecondaryPersonalSubAreaID']")
    }
    getVacancyCounttextArea()
    {
        return cy.xpath("//input[@id='VacancyCount']")
    }
    getHirePanIndiaRdoButton()
    {
        return cy.xpath("//input[@id='HirePanIndiaNo']")
    }
    getScrn1SaveasDraftButton()
    {
        return cy.xpath("//button[@id='SaveAsDraft']")
    }
    //Screen 2
    getExperienceCmBox()
    {
        return cy.xpath("//select[@id='ddlExperience']")
    }
    getQualificationCmBox()
    {
        return cy.xpath("//select[@id='ddlQualification']")
    }
    getjobDesriptionTextArea()
    {
        return cy.xpath("//textarea[@id='TxtjobDesription']")
    }
    getDesignationCmBox()
    {
        return cy.xpath("//select[@id='ddlDesignationCode']")
    }
    getPACmBox()
    {
        return cy.xpath("//select[@id='ddlPA']")
    }
    getSecPACmBox()
    {
        return cy.xpath("//select[@id='ddlSecondaryPA']")
    }
    getCWLCmBox()
    {
        return cy.xpath("//select[@id='ddlJoiningLocation']")
    }
    getSecCWLCmBox()
    {
        return cy.xpath("//select[@id='ddlSecondaryJoiningLocation']")
    }
    getStateCmBox()
    {
        return cy.xpath("//select[@id='ddlState']")
    }
    getCityCmBox()
    {
        return cy.xpath("//select[@id='ddlCity']")
    }
    getTPrdoButton()
    {
        return cy.xpath("//input[@id='TPno']")
    }
    getS2SaveasdraftButton()
    {
        return cy.get('#SaveAsDraft')
    }
    getBillingTypeCmBox()
    {
        return cy.xpath("//select[@id='BillingTypeID']")
    }
    getOnBoardingDateCmBox()
    {
        return cy.xpath("//input[@id='OnBoardingDate']")
    }
}
export default CreateNewRequisition;  