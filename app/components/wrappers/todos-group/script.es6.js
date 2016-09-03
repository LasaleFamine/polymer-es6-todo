'use strict';

// Main library
import {
  Polymer
} from "./../../polymer";


export class TodosGroup {

  get behaviors() {
    return [];
  }

  beforeRegister() {
    this.is = 'todos-group';
    this.properties = {
      thereAreTodos: {
        type: Boolean,
        value: false
      },
      thereAreArchive: {
        type: Boolean,
        value: false
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
    },

		this.observers = [
			'_todoChanged(todos)',
			'_todoArchiveChanged(todosArchive)'
		]
  }

  setActive(todos) {
    this.$$('#todosCheckbox').set('active', todos)
  }

  getActive() {
    return this.$$('#todosCheckbox') ? this.$$('#todosCheckbox').active : []
  }

  _todoChanged(todos) {
    todos.length > 0 ? this.set('thereAreTodos', true) : this.set('thereAreTodos', false)
  }

  _todoArchiveChanged(todosArchive) {
    todosArchive.length > 0 ? this.set('thereAreArchive', true) : this.set('thereAreArchive', false)
  }


}

Polymer(TodosGroup);
