@createNewApp
@smoke
@no-extension
Feature: CreateNewApp

  Scenario Outline: As a user, I can log into the bubble.io

    Given I am on the login page
    When Log in to the account with <username>
    Then I should see menu button called <menu>

    Examples:
      | username         | menu |
      | dev+interviews@airdev.co | Menu |

  Scenario Outline: As a user I create a new app

    When I create a new app <button>
    Then New app is created

    Examples:
      | button  |
      | New app |

  Scenario: As a user I go to Bubble Editor

    When I run the app as an admin user
    Then I redirected to admin portal
    Then I add app identifiers

  Scenario Outline: As a user I want to register an app with Canvas

    When I register the app with Canvas
    Then I redirected to the canvas sign up page with title <title>

    Examples:
      | title             |
      | Welcome to Canvas |
