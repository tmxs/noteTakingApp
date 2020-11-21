Feature:
  In order to prove that the login works correctly
  As a user
  I want to test the login scenario

  Scenario: It receives a response from Symfony's kernel
    When a login scenario sends a request to "/login"
    Then the response should be received
