Feature: Manage todo tasks
  As a user
  I want to manage my todo tasks
  So that I can track what needs to be done

  Scenario: Add a new todo
    Given the user is on the todo page
    When the user adds a todo "Buy milk"
    Then the todo "Buy milk" should be displayed in the list

  Scenario: Delete a todo
    Given a todo "Buy milk" exists
    When the user deletes the todo "Buy milk"
    Then the todo "Buy milk" should no longer be displayed

  Scenario: Delete default todos
    Given the application has default todos
    When the user deletes all default todos
    Then no todos should be displayed

  Scenario: Edit an existing todo
    Given a todo "Initial task" exists
    When the user edits the todo to "Updated task"
    Then the todo should display "Updated task"

  Scenario: Cancel todo edit
    Given a todo "Initial task" exists
    When the user starts editing the todo
    And cancels the edit by pressing the Escape key
    Then the todo should still display "Initial task"

  Scenario: Move todo to completed
    Given a todo "Buy milk" exists
    When the user marks the todo "Buy milk" as completed
    Then the todo "Buy milk" should be marked as completed
    And not visible in the Active filter.

  Scenario: Return todo from completed to active
    Given a completed todo "Buy milk" exists
    When the user marks the todo "Buy milk" as active
    Then the todo "Buy milk" should be marked as active

  Scenario: Navigate to active todos
    Given active and completed todos exist
    When the user navigates to the Active todos view
    Then only active todos should be displayed

  Scenario: Navigate to completed todos
    Given active and completed todos exist
    When the user navigates to the Completed todos view
    Then only completed todos should be displayed

  Scenario: Clear completed todos
    Given completed todos exist
    When the user clears completed todos
    Then no completed todos should be displayed

  Scenario: Select all todos
    Given multiple todos exist
    When the user selects all todos
    Then all todos should be marked as completed

  Scenario: Persist todos after page reload
    Given a todo "Persistent task" exists
    When the page is refreshed
    Then the todo "Persistent task" should still be displayed
