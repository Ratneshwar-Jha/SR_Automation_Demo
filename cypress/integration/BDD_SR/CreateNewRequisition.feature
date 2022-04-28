Feature: Initiator Functionality

    SR QA Url TC
        @CreateNewRequisition
        Scenario:  Create New Requisition functionality
        Given Login as SR user.
        When I input required details of Requisition and click on Submit button.
        Then system should create new requisition.