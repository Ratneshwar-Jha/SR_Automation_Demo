class InitiatorPage
{
    //HomePage 
    getInitiatorActionLink()
    {
        return cy.xpath("//a[text()='Initiator Actions']")
    }
    getCreateNewRequisitionLink()
    {
        return cy.xpath("//a[text()='Create New Requisition']")
    }
    getManageRequisitionLink()
    {
        return cy.xpath("//a[text()='Manage Requisitions']")
    }
    getSearchRequisitiontext()
    {
        return cy.get('input#ReqNo')
    }
    getSearchRequisitionButton()
    {
        return cy.get('input#SearchReq')
    }
    getDropVacancyicon()
    {
        return cy.xpath("//a[@class='DropVacency']")
    }
    getDropVacancyReasonDropdown()
    {
        return cy.xpath("//select[@id='ddlreason']")
    }
    getDropVacancyRemarkText()
    {
        return cy.xpath("//textarea[@id='txtRemarks']")
    }
    getDropVacancySubmitButton()
    {
        return cy.xpath("//button[@id='btnSubmit']")
    }
    getEditIcon()
    {
        return cy.xpath("//a[contains(@id, 'edit')]")
    }
    getGraIDTextArea()
    {
        return cy.xpath("//input[@id='GraID']")
    }
    getEditUpdateButton()
    {
        return cy.xpath("//input[@id='Update']")
    }
}

export default InitiatorPage;