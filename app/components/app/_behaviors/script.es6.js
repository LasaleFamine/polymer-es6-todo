'use strict';

export const AppBehaviors = {

	properties: {
	},

	/**
	* Get the top level application component .
	*
	* @return {HTMLElement} The <app-clab> element.
	*/
	getApp: function(){
		return document.querySelector('todo-app');
	},

	/**
	* Show notification message.
	*
	* @param {object} obj The notification object parameters.
	*/
	Notify: function(obj){
		this.getApp().$.notify.visible = true;
		this.getApp().set('alertOpts', obj);
	}

}
