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
Given a todo "Buy milk" exists
When the user edits the todo to "Updated task"
Then the todo should display "Updated task"

Scenario: Cancel todo edit
Given a todo "Buy milk" exists
When the user starts editing the todo
And cancels the edit by pressing the Escape key
Then the todo should still display "Buy milk"

Scenario: Move todo to completed
Given a todo "Buy milk" exists
When the user marks the todo "Buy milk" as completed
Then the todo "Buy milk" should be marked as completed
And not visible in the Active filter

Scenario: Return todo from completed to active
Given a completed todo "Buy milk" exists
When the user marks the todo "Buy milk" as active
Then the todo "Buy milk" should be marked as active
And not visible in the Completed filter.

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

Scenario: Toggle all todos as completed
Given multiple todos exist
When the user selects all todos
Then all todos should be marked as completed and be visible in the completed filter

Scenario: Persist todos after page reload
Given a todo "Buy milk" exists
When the page is refreshed
Then the todo "Buy milk" should still be displayed

@edge
Scenario: Add todo with leading/trailing spaces
Given the user enters a todo " Buy milk "
When the todo is added
Then the todo text should be trimmed to "Buy milk"

@edge
Scenario: Add empty todo
Given the user attempts to add an empty todo
When the user submits the input
Then no new todo should be added

@edge
Scenario: Drag-n-drop text not saved until keypress
Given the user drags text into the todo input
When the user presses Enter
Then the text should be added as a new todo

@negative
@bug
Scenario: Application fails on malformed localStorage
Given the localStorage contains invalid todo data: ""
When the application loads
Then the app should not crash
But in current implementation it fails (UI breaks)
