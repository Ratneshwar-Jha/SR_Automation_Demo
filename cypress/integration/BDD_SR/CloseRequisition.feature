Feature: Initiator Functionality

    SR QA Url TC
        @close
        Scenario:  Close Requisition functionality
        Given Login as SR user.
        When I input required details of Requisition and click on Close button.
        Then system should close requisition.