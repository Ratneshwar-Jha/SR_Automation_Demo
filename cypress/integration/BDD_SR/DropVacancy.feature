Feature: Initiator Functionality

    SR QA Url TC
        @drop
        Scenario:  Drop Vacancy of a Requisition functionality
        Given Login as SR user.
        When I input required details of drop Vacancy and click on submit button.
        Then system should Reduce vacancy of the requisition.
        