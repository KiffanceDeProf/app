'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Classroom = mongoose.model('Classroom'),
	_ = require('lodash');

/**
 * Create a Classroom
 */
exports.create = function(req, res) {
	var classroom = new Classroom(req.body);
	classroom.user = req.user;

	classroom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(classroom);
		}
	});
};

/**
 * Show the current Classroom
 */
exports.read = function(req, res) {
	res.jsonp(req.classroom);
};

/**
 * Update a Classroom
 */
exports.update = function(req, res) {
	var classroom = req.classroom ;

	classroom = _.extend(classroom , req.body);

	classroom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(classroom);
		}
	});
};

/**
 * Delete an Classroom
 */
exports.delete = function(req, res) {
	var classroom = req.classroom ;

	classroom.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(classroom);
		}
	});
};

/**
 * List of Classrooms
 */
exports.list = function(req, res) { Classroom.find().sort('-created').populate('user', 'displayName').exec(function(err, classrooms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(classrooms);
		}
	});
};

/**
 * Classroom middleware
 */
exports.classroomByID = function(req, res, next, id) { Classroom.findById(id).populate('user', 'displayName').exec(function(err, classroom) {
		if (err) return next(err);
		if (! classroom) return next(new Error('Failed to load Classroom ' + id));
		req.classroom = classroom ;
		next();
	});
};

/**
 * Classroom authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.classroom.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};