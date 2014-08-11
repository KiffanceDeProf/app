'use strict';

module.exports = {
	db: 'mongodb://localhost/kiffancedeprof-dev',
	app: {
		title: 'KiffanceDeProf - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '536155776482498',
		clientSecret: process.env.FACEBOOK_SECRET || '3bb5880986f8a223ba36e976ba1595b2',
		callbackURL: 'http://sandhose.fr:1337/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'AW0eOyQcb4S1DTdgDLifpg',
		clientSecret: process.env.TWITTER_SECRET || 'jU0eyPDUqy2cttnMyQ4nFJJTKDkwYDRRAW0QlO7PeeY',
		callbackURL: 'http://sandhose.fr:1337/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '506222262794-dd20rd6585d226a2gmlauvv5to17fnij.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'vD7HxFHefIIuZ4vAE36tYNlE',
		callbackURL: 'http://sandhose.fr:1337/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://sandhose.fr:1337/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || '04bb6116d11fa58fee78',
		clientSecret: process.env.GITHUB_SECRET || 'c7cff2e4dcbc08cec102fa7f917b46bdfaff2020',
		callbackURL: 'http://sandhose.fr:1337/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
