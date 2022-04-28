Feature: Approver ReferBack Functionality

    SR QA Url TC
        @ApproveRequisition
        Scenario:  Approve New Requisition functionality
        Given Login as SR user.
        When I input required details of Requisition and click on Submit button.
        Then Approver should be able to Referback requisition.