Feature: User registration and login

  Scenario: Register new user
    Given I am a new user
    When I register with a valid email and password
    Then I should see a confirmation message

  Scenario: Login with valid credentials
    Given I am a registered user
    When I log in with correct credentials
    Then I should be redirected to my dashboard

  Scenario: Login with invalid credentials
    Given I am a registered user
    When I log in with incorrect credentials
    Then I should see an error message
