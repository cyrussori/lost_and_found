Feature: Create a lost item post
  As a user
  I want to create a lost item report
  So that others can help me find it

  Scenario: Successfully creating a lost item post
    Given I am on the "Create Post" page
    When I fill in the lost item form correctly
    And I submit the form
    Then I should see a confirmation message "Post created successfully"
    And I should see my new post displayed in the feed
