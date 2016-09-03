'use strict';

// Main library
import {
  Polymer
} from "./../../polymer";

import {
  TodosGroup
} from "./../../wrappers/todos-group/script.es6";

import {
  AppBehaviors
} from './../_behaviors/script.es6';

export class TodoApp {

  get behaviors() {
    return [AppBehaviors];
  }

  beforeRegister() {
    this.is = 'todo-app';
    this.properties = {
      input: {
        type: String,
        value: ""
      },
      todos: {
        type: Array,
        value: [],
				notify: true
      },
      todosArchive: {
        type: Array,
        value: [],
				notify: true
      }
    }
  }

  attached() {
    console.log("%cPolymer ES6 Todos!\n%cweb components are the <bees-knees> (in according with the Polymer team)","font-size:1.5em;color:#4558c9;","color:#d61a7f;font-size:1em;")
    this.set('todos', ['Lorem ipsume', 'This is a test todo', 'Another good test todo'])
  }

  _checkValue(evt) {
    this.$.todoInput.type = this.input === '' ? "error" : ""
  }

  addTodo() {
    // Check for empty input
    if (this.input === '') {
      this.$.todoInput.type = "error"
      this.Notify({
        type: 'error',
        text: 'You need to specify an input!'
      })
      return false
    }

		// BUG: this.push NOT WORKING
    //this.push('todos', this.input)
		this.set('todos', [this.input].concat(this.todos))

    // Switch current active
    let currentActive = this.$.todosGroup.getActive()
    // if(currentChecked.length > 0) {
    //   let newCheck = []
    //   currentChecked.forEach((active) => {
    //     newCheck = newCheck.concat(active + 1)
    //   })
    //   // Remove last checked
    //   // NOTE: to check on Pattern library
    //   let lastChecked = this.$.todosGroup.$$('#todosCheckbox').$$('input[type=checkbox]:checked')
    //   lastChecked ? lastChecked.checked = false : null
    //   this.$.todosGroup.setActive(newCheck)
    // }

    // Clean input
    this.set('input', '')
  }

  removeTodo() {
    let currentChecked = this.$.todosGroup.getActive()

    // Check for empty checked
    if(currentChecked.length === 0) {
      this.Notify({
        type: 'error',
        text: 'You need to select some todo'
      })
      return
    }

    // Remove todos
    let toArchive = []
		this.todos = this.todos.filter((todo, i) => {
      let res = currentChecked.indexOf(i) === -1
      res === false ? toArchive.push(todo) : null
			return res
		})

    // Empty current active
		this.$.todosGroup.setActive(new Array)

    // Fill archiveTodos
    this.$.todosGroup.set('todosArchive', this.$.todosGroup.todosArchive.concat(toArchive))

    // Remove last checked
    // NOTE: to check on Pattern library
    let lastChecked = this.$.todosGroup.$$('#todosCheckbox').$$('input[type=checkbox]:checked')
    lastChecked ? lastChecked.checked = false : null
  }

  selectAll() {
    let allTodos = []
    // Check every checkbox
    // NOTE: to check on Pattern
    this.$.todosGroup.$$('#todosCheckbox').querySelectorAll('input[type=checkbox]').forEach((single, i) => {
      this.$.todosGroup.$$('#todosCheckbox').querySelectorAll('input[type=checkbox]')[i].checked = true
    })
    // Push new todo index
    this.todos.forEach((todo, i) => {
      allTodos = allTodos.concat(i)
    })
    // Set new todos active
    this.$.todosGroup.setActive(allTodos)
  }

}

Polymer(TodoApp);
