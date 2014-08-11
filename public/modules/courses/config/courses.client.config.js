'use strict';

// Configuring the Articles module
angular.module('courses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('adminbar', 'Courses', 'courses', 'dropdown', '/courses(/create)?');
		Menus.addSubMenuItem('adminbar', 'courses', 'List Courses', 'courses');
		Menus.addSubMenuItem('adminbar', 'courses', 'New Course', 'courses/create');
	}
]);