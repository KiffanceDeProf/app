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
  description: {
    type: String,
    default: '',
    trim: true
  },
  attributes: {
    mark : {
      type: Number,
      required: true,
      default: 10,
      min: 0,
      max: 20
    },
    mood: {
      type: Number,
      required: true,
      default: 50,
      min: 0,
      max: 100
    },
    mind: {
      type: Number,
      required: true,
      default: 50,
      min: 0,
      max: 100
    },
    vision: {
      type: Number,
      required: true,
      default: 50,
      min: 0,
      max: 100
    },

    // ---

    teacher_relationship: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    other_relationship: {
      type: Number,
      required: true,
      default: 0,
      min: -1,
      max: 1
    },
    school_relationship: {
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

StudentSchema.virtual('name.full').get(function() {
  return this.name.first + ' ' + this.name.last;
}).set(function (name) {
  if(name) {
    //pour les noms composés type 'Henry De La Turbidière'
    var idx = name.indexOf(' ');
    if(idx !== -1) {
      this.name.first = name.substr(0,idx); //avant l'espace
      this.name.last = name.substr(idx+1); //après l'espace
    } else { //pas de nom de famille (-1) ?
      this.name.first = name;
      this.name.last = '';
    }
  }
});

mongoose.model('Student', StudentSchema);
