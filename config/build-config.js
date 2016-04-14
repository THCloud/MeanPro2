/**
 * ./config/build-config.js 	
 *
 * @file   this file contains the config used in gulp.
 *
 * @author TH_Cloud
 *
 */

// source files to minify or copy.
var src = {
    js: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        
        './public/assets/js/app.js',
	    './public/assets/js/controllers/*.js',
        './public/assets/js/services/*.js',
        './public/assets/js/directives/*.js',
        './public/assets/js/route.js',
        './public/assets/js/i18n.js'
	
    ],
    css: [
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './public/assets/css/*.css'
    ],
    copy: './bower_components/bootstrap/dist/fonts/*.*'
};

// final path to build.
var path = {
    js: './public/dist/js',
    css: './public/dist/css',
    copy: './public/dist/fonts'
};

// source file to concat.
var concat = {
    js: 'app.js',
    css: 'main.css',
};

// files need to be delete before minify.
var del = [];

// core config entity.
var conf = {
	srcFiles: src,
	buildPath: path,
	concat: concat,
	del: del
};

module.exports = function() {
	return conf;
};


