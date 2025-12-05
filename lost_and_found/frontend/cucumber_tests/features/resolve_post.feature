Feature: Resolve a post
  As a user
  I want to mark my post as resolved
  So that others know the item has been found

  Scenario: Successfully resolving a post
    Given I am viewing one of my lost item posts
    When I click the "Mark as Resolved" button
    Then the post should display a "Resolved" badge
