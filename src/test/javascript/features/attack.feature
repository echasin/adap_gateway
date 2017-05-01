Feature: Running Cucumber with Protractor

    Scenario: Protractor and Cucumber Test
        Given I go to "http://localhost:8099/#/"
        When I add login credential 
        Then I go to scenario home page
        Then I go to scenario details page
        Then I go to edit attack tree page
        Then build attack tree
        