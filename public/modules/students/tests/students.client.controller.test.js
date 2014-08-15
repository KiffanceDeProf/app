'use strict';

(function() {
	// Students Controller Spec
	describe('Students Controller Tests', function() {
		// Initialize global variables
		var StudentsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Students controller.
			StudentsController = $controller('StudentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Student object fetched from XHR', inject(function(Students) {
			// Create sample Student using the Students service
			var sampleStudent = new Students({
				name: {
          first: 'New',
          last: 'Student'
        },
        course: null,
        attributes: {
          behaviour: 0,
          height: 0,
          mark: 10,
          mind: 50,
          mood: 50,
          other_relationship: 0,
          popularity: 0,
          school_relationship: 0,
          teacher_relationship: 0,
          vision: 50
        }
			});

			// Create a sample Students array that includes the new Student
			var sampleStudents = [sampleStudent];

			// Set GET response
			$httpBackend.expectGET('students').respond(sampleStudents);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.students).toEqualData(sampleStudents);
		}));

		it('$scope.findOne() should create an array with one Student object fetched from XHR using a studentId URL parameter', inject(function(Students) {
			// Define a sample Student object
			var sampleStudent = new Students({
				name: {
          first: 'New',
          last: 'Student'
        },
        course: null,
        attributes: {
          behaviour: 0,
          height: 0,
          mark: 10,
          mind: 50,
          mood: 50,
          other_relationship: 0,
          popularity: 0,
          school_relationship: 0,
          teacher_relationship: 0,
          vision: 50
        }
			});

			// Set the URL parameter
			$stateParams.studentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/students\/([0-9a-fA-F]{24})$/).respond(sampleStudent);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.student).toEqualData(sampleStudent);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Students) {
			// Create a sample Student object
			var sampleStudentPostData = new Students({
				name: {
          first: 'New',
          last: 'Student'
        },
        course: null,
        attributes: {
          behaviour: 0,
          height: 0,
          mark: 10,
          mind: 50,
          mood: 50,
          other_relationship: 0,
          popularity: 0,
          school_relationship: 0,
          teacher_relationship: 0,
          vision: 50
        }
			});

			// Create a sample Student response
			var sampleStudentResponse = new Students({
				_id: '525cf20451979dea2c000001',
				name: {
          first: 'New',
          last: 'Student'
        },
        course: null,
        attributes: {
          behaviour: 0,
          height: 0,
          mark: 10,
          mind: 50,
          mood: 50,
          other_relationship: 0,
          popularity: 0,
          school_relationship: 0,
          teacher_relationship: 0,
          vision: 50
        }
			});

			// Fixture mock form input values
      scope.first_name = 'New';
			scope.last_name = 'Student';

			// Set POST response
			$httpBackend.expectPOST('students', sampleStudentPostData).respond(sampleStudentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
      expect(scope.first_name).toEqual('');
			expect(scope.last_name).toEqual('');

			// Test URL redirection after the Student was created
			expect($location.path()).toBe('/students/' + sampleStudentResponse._id);
		}));

		it('$scope.update() should update a valid Student', inject(function(Students) {
			// Define a sample Student put data
			var sampleStudentPutData = new Students({
				_id: '525cf20451979dea2c000001',
				name: {
          first: 'New',
          last: 'Student'
        },
        course: null,
        attributes: {
          behaviour: 0,
          height: 0,
          mark: 10,
          mind: 50,
          mood: 50,
          other_relationship: 0,
          popularity: 0,
          school_relationship: 0,
          teacher_relationship: 0,
          vision: 50
        }
			});

			// Mock Student in scope
			scope.student = sampleStudentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/students\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/students/' + sampleStudentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid studentId and remove the Student from the scope', inject(function(Students) {
			// Create new Student object
			var sampleStudent = new Students({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Students array and include the Student
			scope.students = [sampleStudent];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/students\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStudent);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.students.length).toBe(0);
		}));
	});
}());
