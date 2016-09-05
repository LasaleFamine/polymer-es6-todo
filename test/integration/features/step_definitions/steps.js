// features/step_definitions/.js

module.exports = function() {

  // ### BACKGROUND
  this.Given(/^I open the homepage$/, function() {
    this
      .url(this.launch_url)
      .waitForElementVisible('body', 3000)
  })
  // ### ===== ###


  ////////////////////////
  // ### DEFAULTAPP.feature //
  ///////////////////////
  this.Then(/^the title is "([^"]*)"$/, function(title) {
    this.assert.title(title)
  })

  this.Then(/^the h1 is "([^"]*)"$/, function(h1) {
    this.assert.containsText('body > todo-app > main > div > h1', h1)
  })
  this.Then(/^the actions buttons are ([^"]*)$/, function(buttons) {
    this.elements('css selector', '.main-actions button-clab', function (el) {
      this.assert.equal(el.value.length, buttons)
    })
  })
  this.Then(/^the todo input exists$/, function() {
    this.assert.visible('#todoInput input')
  })
  this.Then(/^([^"]*) default todos are showing correctly$/, function(todos) {
    this.elements('css selector', 'input[type=checkbox]', function (el) {
      this.assert.equal(el.value.length, todos)
    })
  })

  this.Then(/^the footer text is "([^"]*)"$/, function(footerText) {
    this.assert.containsText('body > todo-app > footer > p', footerText)
  })

  this.Then(/^the note text is "([^"]*)"$/, function(noteText) {
    this.assert.containsText('body > todo-app > footer > p > span', noteText)
  })

  // ### GITHUB SCENARIO
  // ===================
  this.Then(/^the github icon exists$/, function (callback) {
    this
      .waitForElementVisible('.fa.fa-github', 1000)
      .assert.visible('.fa.fa-github')
    callback()
  });
  this.When(/^I click on the github link$/, function (callback) {
    this.click('.github-link')
    callback()
  });
  this.Then(/^the title on github is "([^"]*)"$/, function(title) {
    this.assert.title(title)
  })

  ////////////////////////
  // ### TODOS.feature //
  ///////////////////////
  // HELPERS
  this.Then(/^I click on the button ([^"]*)$/, function(whatButton) {
    this.click('body > todo-app > main > div > div > button-clab:nth-child('+ whatButton +')')
  })
  this.Then(/^I see ([^"]*) todos$/, function(todos) {
    this.elements('css selector', 'input[type=checkbox]', function (el) {
      this.assert.equal(el.value.length, todos)
    })
  })

  // ### Add todo SCENARIO
  // ===================
  this.Then(/^I fill the input text$/, function() {
    this.setValue('#todoInput input', "Simple todo")
  })


  // ### Remove todo SCENARIO
  // ===================
  this.Then(/^I check a todo$/, function() {
    this.click('#todosCheckbox > div:nth-child(1) > label')
  })

  // ### Select all SCENARIO
  // ===================
  this.Then(/^I see ([^"]*) todos checked$/, function(todos) {
    this.elements('css selector', 'input[type=checkbox]:checked', function (el) {
      this.assert.equal(el.value.length, todos)
    })
  })

  // ### Archived todos SCENARIO
  // ===================
  this.Then(/^I see ([^"]*) todo archived$/, function(todos) {
    this
      .assert.visible('#archivedWrapper ul > li > strike')
      .assert.containsText('#archivedWrapper ul > li > strike', 'Lorem ipsume')
  })
}
