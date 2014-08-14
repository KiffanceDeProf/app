'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var classrooms = require('../../app/controllers/classrooms');

	// Classrooms Routes
	app.route('/classrooms')
		.get(classrooms.list)
		.post(users.requiresLogin, classrooms.create);

	app.route('/classrooms/:classroomId')
		.get(classrooms.read)
		.put(users.requiresLogin, classrooms.hasAuthorization, classrooms.update)
		.delete(users.requiresLogin, classrooms.hasAuthorization, classrooms.delete);

	// Finish by binding the Classroom middleware
	app.param('classroomId', classrooms.classroomByID);
};