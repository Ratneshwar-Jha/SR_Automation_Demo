Feature: Initiator Functionality

    SR QA Url TC
        @copy
        Scenario:  Copy Requisition functionality
        Given Login as SR user.
        When I input required details of Requisition and click on Copy button.
        Then system should create new requisition.