@smoke
Feature: AppIsNotRegistered

  Scenario Outline: As a user, I can log into the bubble.io

    Given I am on the login page
    When Log in to the account with <username>
    Then I should see menu button called <menu>

    Examples:
      | username                      | menu |
      | dev+interviews@airdev.co | Menu |

  Scenario: As a user I create a new app

    When I create a new app <button>
    Then New app is created

    Examples:
      | button  |
      | New app |

  Scenario: As a user I go to Bubble Editor

    When I run the app as an admin user
    Then I redirected to admin portal
    Then I add app identifiers

  Scenario: As a user I use the chrome extension to add a new page to the Bubble app

    Given I am back on the Bubble Editor page
    When I open Canvas Extension
    Then I get a warning message <message>

    Examples:
      | message                   |
      | Your app isn't registered |
