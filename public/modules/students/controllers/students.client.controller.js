'use strict';

// Students controller
angular.module('students').controller('StudentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Students', 'Courses',
	function($scope, $stateParams, $location, Authentication, Students, Courses ) {
		$scope.authentication = Authentication;

		// Create new Student
		$scope.create = function() {
			// Create new Student object
			var student = new Students ({
				name: {
					first: this.first_name,
					last: this.last_name
				},
				course: this.course,
				description: this.description,
				attributes: $scope.attributes
			});


			// Redirect after save
			student.$save(function(response) {
				$location.path('students/' + response._id);

				// Clear form fields
				$scope.first_name = '';
				$scope.last_name = '';
				$scope.course = '';
				$scope.description = '';
				$scope.initAttributes();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Student
		$scope.remove = function( student ) {
			if ( student ) { student.$remove();

				for (var i in $scope.students ) {
					if ($scope.students [i] === student ) {
						$scope.students.splice(i, 1);
					}
				}
			} else {
				$scope.student.$remove(function() {
					$location.path('students');
				});
			}
		};

		// Update existing Student
		$scope.update = function() {
			var student = $scope.student ;

			student.$update(function() {
				$location.path('students/' + student._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Students
		$scope.find = function() {
			$scope.students = Students.query();
		};

		// Find existing Student
		$scope.findOne = function() {
			$scope.student = Students.get({ 
				studentId: $stateParams.studentId
			});
		};

		$scope.attrList = {
			mark: {
				default: 10,
				min: 0,
				max: 20
			},
			mood: {
				default: 50,
				min: 0,
				max: 100
			},
			mind: {
				default: 50,
				min: 0,
				max: 100
			},
			vision: {
				default: 50,
				min: 0,
				max: 100
			},
			teacher_relationship: {
				default: 0,
				min: -1,
				max: 1
			},
			other_relationship: {
				default: 0,
				min: -1,
				max: 1
			},
			school_relationship: {
				default: 0,
				min: -1,
				max: 1
			},
			popularity: {
				default: 0,
				min: -1,
				max: 1
			},
			behaviour: {
				default: 0,
				min: -1,
				max: 1
			},
			height: { // Arbitraire, ou réelle ? genre [-1, 1] ou [1m10, 1m80] ?
				default: 0,
				min: -1,
				max: 1
			}
		};

		$scope.initAttributes = function() {
			$scope.attributes = {};
			for(var i in $scope.attrList) {
				$scope.attributes[i] = $scope.attrList[i].default;
			}
		};

		$scope.getCourses = function() {
			$scope.courses = Courses.query();
		};

		$scope.course = null;
	}

]);
