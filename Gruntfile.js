module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['app/js/*.js'],
				tasks: ['concat']
			},
			stylesheets: {
				files: ['app/css/*.css'],
				tasks: ['csso']
			}
		},

		// ngmin: {
		//   controllers: {
		//     src: ['app/js/controllers.js'],
		//     dest: 'app/js/controllers.min.js'
		//   },
		//   services: {
		//     src: ['app/js/services.js'],
		//     dest: 'app/js/services.min.js'
		//   },
		//   animations: {
		//     src: ['app/js/animations.js'],
		//     dest: 'app/js/animations.min.js'
		//   },
		// },

		concat: {
			options: {
				separator: ';',
				stripBanners: true,
			},
			// This will uglify all .js files at src
			build: {
				files: {
					'app/js/appmin.js': [
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-resource/angular-resource.js',
						'bower_components/angular-cookie/angular-cookie.min.js',
						'bower_components/firebase/firebase.js',
						'bower_components/angularfire/angularfire.min.js',
						'bower_components/firebase-simple-login/firebase-simple-login.js',
						'bower_components/angular-animate/angular-animate.js',
						'bower_components/jquery/jquery.js',
						'app/js/app.js',
						'app/js/services.js',
						'app/js/controllers.js',
						'app/js/bootstrap.js',
						'app/js/animations.js',
					],
				}
			}
		},

		uglify: {
			options: {
				mangle: false,
				preserveComments: false,
			},
			// This will uglify all .js files at src
			build: {
				files: {
					'app/js/appmin.js': [
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-resource/angular-resource.js',
						'bower_components/angular-cookie/angular-cookie.min.js',
						'bower_components/firebase/firebase.js',
						'bower_components/angularfire/angularfire.min.js',
						'bower_components/firebase-simple-login/firebase-simple-login.js',
						'bower_components/angular-animate/angular-animate.js',
						'bower_components/jquery/jquery.js',
						'app/js/app.js',
						'app/js/services.js',
						'app/js/controllers.js',
						'app/js/bootstrap.js',
						'app/js/animations.js',
					],
				}
			}
		},

		csso: {
			// This will optimize all .css files in src
			build: {
				files: {
					'app/css/appmin.css': [
						'app/css/bootstrap.min.css',
						'app/css/animations.css',
						'app/css/app.css',
					],
				}
			}
		},

	});

	grunt.registerTask('default', ['csso', 'concat']);
	grunt.registerTask('build', ['csso', 'uglify']);
}