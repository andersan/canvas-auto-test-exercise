@no-extension
@complete-launch
Feature: CompleteTheLaunchChecklistAgencyPlan

  Scenario Outline: As a user, I can log into the bubble.io

    Given I am on the login page
    When Log in to the account with <username>
    Then I should see menu button called <menu>

    Examples:
      | username         | menu |
      | dev+interviews@airdev.co | Menu |

  Scenario: As a user I create a new app

    When I create a new app <button>
    Then New app is created

    Examples:
      | button  |
      | New app |

  Scenario Outline: Set Agency Plan

    When I open Settings tab
    Then I change to the <plan> plan

    Examples:
      | plan   |
      | Agency |

  Scenario: As a user I go to Bubble Editor
    When I run the app as an admin user
    Then I open url
    Then I redirected to admin portal
    Then I add app identifiers

  Scenario Outline: As a user I want to register an app with Canvas

    When I register app
    Then I redirected to the canvas sign up page with title <title>

    Examples:
      | title             |
      | Welcome to Canvas |

  Scenario: I log in as admin to canvas

    When I log in as admin to canvas
    Then I choose <license> license

    Examples:
      | license |
      | Free    |

  Scenario: Complete the launch checklist

    When I redirected to admin portal
    Then I verify app is registered with success
    Then I install the Canvas extension

    Then I learn about canvas
    Then I add app name
    Then I add app logos

    Then I update log in page branding with <type> background
    Then I Update your default SEO / social tags
    Then I learn about your app's development and live databases
    Then I update navigation
    Then I enable outgoing email

    Examples:
      | type     |
      | Gradient |
