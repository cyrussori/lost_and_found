Feature: Search items
  As a user
  I want to search for items
  So that I can quickly find posts relevant to me

  Scenario: Search by keyword
    Given I am on the home page
    When I type "wallet" into the search bar
    And I submit the search
    Then I should see results containing "wallet"
