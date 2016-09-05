Feature: Adding, removing todos

Background:
  Given I open the homepage

Scenario: Add a todo
  Then I fill the input text
  When I click on the button 1
  Then I see 4 todos

Scenario: Remove todo
  Then I check a todo
  When I click on the button 3
  Then I see 2 todos

Scenario: Select all button working
  Then I click on the button 2
  Then I see 3 todos checked

Scenario: Archived todos are showing
  Then I check a todo
  When I click on the button 3
  Then I see 1 todo archived
