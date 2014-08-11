'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
	name: {
		first: {
			type: String,
			required: 'Please fill Student first name',
			default: '',
			trim: true
		},
		last: {
			type: String,
			required: 'Please fill Student last name',
			default: '',
			trim: true
		}
	},
	course: {
		type: Schema.ObjectId,
		default: null,
		ref: 'Course'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
  attributes: {
    mood: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    mind: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    vision: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },

    // ---

    teacher_relation: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    other_relation: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    school_relation: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },

    // ---

    popularity: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    behaviour: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    height: { // Arbitraire, ou réelle ? genre [-1, 1] ou [1m10, 1m80] ?
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    }
  }
});

mongoose.model('Student', StudentSchema);
