'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Classroom Schema
 */
var ClassroomSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Classroom name',
		trim: true
	},
  size: {
    height: {
      type: Number,
      default: 18,
      min: 4,
      max: 30
    },
    width: {
      type: Number,
      default: 9,
      min: 4,
      max: 30
    }
  },
  map: [Schema.Mixed],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Classroom', ClassroomSchema);
