/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _script = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Main library

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TodoApp = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _polymer = __webpack_require__(2);

	var _script = __webpack_require__(3);

	var _script2 = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TodoApp = exports.TodoApp = function () {
	  function TodoApp() {
	    _classCallCheck(this, TodoApp);
	  }

	  _createClass(TodoApp, [{
	    key: "beforeRegister",
	    value: function beforeRegister() {
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
	      };
	    }
	  }, {
	    key: "attached",
	    value: function attached() {
	      console.log("%cPolymer ES6 Todos!\n%cweb components are the <bees-knees> (in according with the Polymer team)", "font-size:1.5em;color:#4558c9;", "color:#d61a7f;font-size:1em;");
	      this.set('todos', ['Lorem ipsume', 'This is a test todo', 'Another good test todo']);

	      fetch('https://jsonplaceholder.typicode.com/comments').then(function (res) {
	        console.log(res);
	      });
	    }
	  }, {
	    key: "_checkValue",
	    value: function _checkValue(evt) {
	      this.$.todoInput.type = this.input === '' ? "error" : "";
	    }
	  }, {
	    key: "addTodo",
	    value: function addTodo() {
	      // Check for empty input
	      if (this.input === '') {
	        this.$.todoInput.type = "error";
	        this.Notify({
	          type: 'error',
	          text: 'You need to specify an input!'
	        });
	        return false;
	      }

	      // BUG: this.push NOT WORKING
	      //this.push('todos', this.input)
	      this.set('todos', [this.input].concat(this.todos));

	      // Switch current active
	      var currentActive = this.$.todosGroup.getActive();
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
	      this.set('input', '');
	    }
	  }, {
	    key: "removeTodo",
	    value: function removeTodo() {
	      var currentChecked = this.$.todosGroup.getActive();

	      // Check for empty checked
	      if (currentChecked.length === 0) {
	        this.Notify({
	          type: 'error',
	          text: 'You need to select some todo'
	        });
	        return;
	      }

	      // Remove todos
	      var toArchive = [];
	      this.todos = this.todos.filter(function (todo, i) {
	        var res = currentChecked.indexOf(i) === -1;
	        res === false ? toArchive.push(todo) : null;
	        return res;
	      });

	      // Empty current active
	      this.$.todosGroup.setActive(new Array());

	      // Fill archiveTodos
	      this.$.todosGroup.set('todosArchive', this.$.todosGroup.todosArchive.concat(toArchive));

	      // Remove last checked
	      // NOTE: to check on Pattern library
	      var lastChecked = this.$.todosGroup.$$('#todosCheckbox').$$('input[type=checkbox]:checked');
	      lastChecked ? lastChecked.checked = false : null;
	    }
	  }, {
	    key: "selectAll",
	    value: function selectAll() {
	      var _this = this;

	      var allTodos = [];
	      // Check every checkbox
	      // NOTE: to check on Pattern
	      this.$.todosGroup.$$('#todosCheckbox').querySelectorAll('input[type=checkbox]').forEach(function (single, i) {
	        _this.$.todosGroup.$$('#todosCheckbox').querySelectorAll('input[type=checkbox]')[i].checked = true;
	      });
	      // Push new todo index
	      this.todos.forEach(function (todo, i) {
	        allTodos = allTodos.concat(i);
	      });
	      // Set new todos active
	      this.$.todosGroup.setActive(allTodos);
	    }
	  }, {
	    key: "behaviors",
	    get: function get() {
	      return [_script2.AppBehaviors];
	    }
	  }]);

	  return TodoApp;
	}();

	(0, _polymer.Polymer)(TodoApp);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Polymer = exports.Polymer = window.Polymer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Main library

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TodosGroup = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _polymer = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TodosGroup = exports.TodosGroup = function () {
	  function TodosGroup() {
	    _classCallCheck(this, TodosGroup);
	  }

	  _createClass(TodosGroup, [{
	    key: 'beforeRegister',
	    value: function beforeRegister() {
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
	      }, this.observers = ['_todoChanged(todos)', '_todoArchiveChanged(todosArchive)'];
	    }
	  }, {
	    key: 'setActive',
	    value: function setActive(todos) {
	      this.$$('#todosCheckbox').set('active', todos);
	    }
	  }, {
	    key: 'getActive',
	    value: function getActive() {
	      return this.$$('#todosCheckbox') ? this.$$('#todosCheckbox').active : [];
	    }
	  }, {
	    key: '_todoChanged',
	    value: function _todoChanged(todos) {
	      todos.length > 0 ? this.set('thereAreTodos', true) : this.set('thereAreTodos', false);
	    }
	  }, {
	    key: '_todoArchiveChanged',
	    value: function _todoArchiveChanged(todosArchive) {
	      todosArchive.length > 0 ? this.set('thereAreArchive', true) : this.set('thereAreArchive', false);
	    }
	  }, {
	    key: 'behaviors',
	    get: function get() {
	      return [];
	    }
	  }]);

	  return TodosGroup;
	}();

	(0, _polymer.Polymer)(TodosGroup);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var AppBehaviors = exports.AppBehaviors = {

		properties: {},

		/**
	 * Get the top level application component .
	 *
	 * @return {HTMLElement} The <app-clab> element.
	 */
		getApp: function getApp() {
			return document.querySelector('todo-app');
		},

		/**
	 * Show notification message.
	 *
	 * @param {object} obj The notification object parameters.
	 */
		Notify: function Notify(obj) {
			this.getApp().$.notify.visible = true;
			this.getApp().set('alertOpts', obj);
		}

	};

/***/ }
/******/ ]);