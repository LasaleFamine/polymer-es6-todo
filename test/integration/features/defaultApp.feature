
Feature: App default appearance

Background:
  Given I open the homepage

Scenario: Default elements on page
  Then the title is "Polymer ES6 Todo"
  And the h1 is "Polymer ES6 Todos"
  And the actions buttons are 3
  And the todo input exists
  And 3 default todos are showing correctly
  And the footer text is "Crafted with clab-ui-components by LasaleFamine © MIT"
  And the note text is "NOTE: this app is intended for personal testing purposes."

Scenario: GitHub link is working
  And the github icon exists
  When I click on the github link
  Then the title on github is "Polymer ES6 Todo"
