'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Student = mongoose.model('Student');

/**
 * Globals
 */
var user, student;

/**
 * Unit tests
 */
describe('Student Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			student = new Student({
				name: {
					first: 'Student',
					last: 'Name'
				},
				user: user,
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

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return student.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			student.name = {};

			return student.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Student.remove().exec();
		User.remove().exec();

		done();
	});
});
