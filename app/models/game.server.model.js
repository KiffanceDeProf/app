'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
	course: {
    type: Schema.ObjectId,
    ref: 'Course',
    required: true
  },
  trimester: [{
    overallScore: {
      type: Number,
      required: true
    },
    studentsMap: [{
      seat: {
        type: Number,
        required: true
      },
      student: {
        type: Schema.ObjectId,
        ref: 'Student',
        required: true
      },
      mood: {
        default: 10,
        type: Number,
        required: true
      },
      note: {
        default: 10,
        type: Number,
        required: true
      }
    }]
  }],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Game', GameSchema);
