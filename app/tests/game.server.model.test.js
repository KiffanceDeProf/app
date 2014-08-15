'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
	Course = mongoose.model('Course'),
	Game = mongoose.model('Game');

/**
 * Globals
 */
var user, game, course;

/**
 * Unit tests
 */
describe('Game Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

    course = new Course({
      name: 'Course name',
      description: 'Course description',
      type: 4
    });

		user.save(function() { 
			game = new Game({
				course: course,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return game.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without course', function(done) { 
			game.course = null;

			return game.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Game.remove().exec();
    User.remove().exec();
		Course.remove().exec();

		done();
	});
});
