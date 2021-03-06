'use strict';

// Classrooms controller
angular.module('classrooms').controller('ClassroomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Classrooms',
	function($scope, $stateParams, $location, Authentication, Classrooms ) {
		$scope.authentication = Authentication;

		// Create new Classroom
		$scope.create = function() {
			// Create new Classroom object
			var classroom = new Classrooms ({
				name: this.name,
				map: this.classroom_map,
				size: {
					height: this.classroom_height,
					width: this.classroom_width
				}
			});

			// Redirect after save
			classroom.$save(function(response) {
				$location.path('classrooms/' + response._id);

				// Clear form fields
				$scope.name = '';
        $scope.classroom_map = [];
        $scope.classroom_height = 4;
        $scope.classroom_width = 4;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Classroom
		$scope.remove = function( classroom ) {
			if ( classroom ) { classroom.$remove();

				for (var i in $scope.classrooms ) {
					if ($scope.classrooms [i] === classroom ) {
						$scope.classrooms.splice(i, 1);
					}
				}
			} else {
				$scope.classroom.$remove(function() {
					$location.path('classrooms');
				});
			}
		};

		// Update existing Classroom
		$scope.update = function() {
			var classroom = $scope.classroom ;

			classroom.$update(function() {
				$location.path('classrooms/' + classroom._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Classrooms
		$scope.find = function() {
			$scope.classrooms = Classrooms.query();
		};

		// Find existing Classroom
		$scope.findOne = function() {
			$scope.classroom = Classrooms.get({ 
				classroomId: $stateParams.classroomId
			});
		};

		$scope.classroom_map = [];
		$scope.cellAttributes = ['desk', 'door', 'heater', 'window', 'blackboard', 'teacher_desk'];

		function updateMap(height, width, map) {
			var i, j;

			if(!map) map = [];

			for(i = 0; i < height; i++) {
				if(!map[i]) map[i] = new Array(width);
				for(j = 0; j < width; j++) {
					if(!map[i][j]) map[i][j] = [];
				}
			}

			return map;
		}

		$scope.$watch('classroom_height', function() {
			$scope.classroom_map = updateMap($scope.classroom_height, $scope.classroom_width, $scope.classroom_map);
		});
		$scope.$watch('classroom_width', function() {
			$scope.classroom_map = updateMap($scope.classroom_height, $scope.classroom_width, $scope.classroom_map);
		});
	}
]);
