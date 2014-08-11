'use strict';

angular.module('students').filter('attributeName', [
	function() {
		return function(input) {
			input = input.replace("_", " ");
      return input.charAt(0).toUpperCase() + input.slice(1);
		};
	}
]);
