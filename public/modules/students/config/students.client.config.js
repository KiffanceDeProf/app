'use strict';

// Configuring the Students module
angular.module('students').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('adminbar', 'Students', 'students', 'dropdown', '/students(/create)?');
    Menus.addSubMenuItem('adminbar', 'students', 'List Students', 'students');
    Menus.addSubMenuItem('adminbar', 'students', 'New Student', 'students/create');
  }
]);
