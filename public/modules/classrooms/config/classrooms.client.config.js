'use strict';

// Configuring the Articles module
angular.module('classrooms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('adminbar', 'Classrooms', 'classrooms', 'dropdown', '/classrooms(/create)?');
		Menus.addSubMenuItem('adminbar', 'classrooms', 'List Classrooms', 'classrooms');
		Menus.addSubMenuItem('adminbar', 'classrooms', 'New Classroom', 'classrooms/create');
	}
]);