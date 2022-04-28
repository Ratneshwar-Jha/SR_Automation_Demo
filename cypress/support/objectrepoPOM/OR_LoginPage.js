class LoginPage
{
    getUserNameEditBox()
    {
        return cy.get('#EmployeeCode')
    }
    getPasswordEditBox()
    {
        return cy.get('#Password')
    }
    getSubmitBtn()
    {
        return cy.get('#SubmitButton')
    }
}

export default LoginPage;