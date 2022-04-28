Feature: Initiator Actions

SR QA Url TC's
    @QALogin
    Scenario: Login to SR QA Website
    Given User is at the login page.
    When User enters username & password and Click on Login Button.
    Then System Should Navigate to Initiator HomePage.

    @CreateNewRequisition
    Scenario:  Create New Requisition functionality
    Given Login as SR user.
    When I input required details of Requisition and click on Submit button.
    Then system should create new requisition.

    @CloseReq
    Scenario:  Close Requisition functionality
    Given Login as SR user.
    When I input required details of Requisition and click on Close button.
    Then system should close requisition.

    @drop
    Scenario:  Drop Vacancy of a Requisition functionality
    Given Login as SR user.
    When I input required details of drop Vacancy and click on submit button.
    Then system should Reduce vacancy of the requisition.

    @editupdate
    Scenario:  Edit Update Requisition functionality
    Given Login as SR user.
    When I input required details to Edit Update Requisition and click on Submit button.
    Then system should Edit Update requisition.