@no-extension
Feature: LoginLogout Bubble.io

  Scenario Outline: As a user, I can log in and log out the bubble.io

    Given I am on the login page
    When Log in to the account with <username>
    Then I should see menu button called <menu>
    Then I click <menu> button and log out
    Then I redirected to Login Page and see Login button

    Examples:
      | username                      | menu |
      | dev+interviews@airdev.co | Menu |
      | dev+interviews@airdev.co              | Menu |
