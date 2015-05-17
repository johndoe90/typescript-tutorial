// plugins
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var tinyLr = require('tiny-lr');
var gutil = require('gulp-util');
var express = require('express');
var inject = require('gulp-inject');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var connectLr = require('connect-livereload');

// constants
var BASE_PATH = 'app/';
var DIST_PATH = 'dist/';

var TS_FILES = [BASE_PATH + '**/*.ts'];
var JS_FILES = [BASE_PATH + '**/*.js'];
var CSS_FILES = [BASE_PATH + '**/*.css'];
var SASS_FILES = [BASE_PATH + '**/*.scss'];
var HTML_FILES = [BASE_PATH + '**/*.html'];

var isProduction = process.env.PROJECT_STAGE === 'production';



function joinArrays() {
	var current;	
	var result = [];

	for ( var i = 0; i < arguments.length; i++ ) {
		current = arguments[i];

		current.forEach(function(val) {
			result.push(val);
		});
	}

	return result;
}

function notifyLr(event) {
	tinyLr.changed({
		body: {
			files: [path.relative(__dirname, event.path)]
		}
	});
}

function scssChanged(event) {
	gulp
		.src(event.path)
		.pipe(sass())
		.pipe(gulp.dest(path.dirname(event.path)));
}

gulp.task('express', function() {
	var app = express();

	app.use(connectLr());
	app.use(express.static(__dirname));
	app.listen(4000);

	tinyLr = tinyLr();
	tinyLr.listen(35729);
});

gulp.task('index', function() {
	var target = gulp.src('index.html');

	var sources = gulp.src(
		joinArrays(CSS_FILES)
	, {read: false});

	return target
		.pipe(inject(sources))
		.pipe(gulp.dest('./'));
});

gulp.task('ts', function() {
	return gulp
		.src(TS_FILES)
		.pipe(ts({
			module: 'amd',
			typescript: typescript
		}))
		.pipe(gulp.dest(BASE_PATH));
});

gulp.task('scss', function() {
	return gulp
		.src(SASS_FILES)	
		.pipe(sass())
		.pipe(gulp.dest(BASE_PATH));
});

gulp.task('watch', function() {
	gulp.watch(TS_FILES, ['ts']);
	gulp.watch(CSS_FILES, notifyLr);
	gulp.watch(HTML_FILES, notifyLr);
	gulp.watch(SASS_FILES, scssChanged);
});

gulp.task('default', ['express','scss', 'index', 'watch']);
