// plugins
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var tinyLr = require('tiny-lr');
var gutil = require('gulp-util');
var express = require('express');
var shell = require('gulp-shell');
var inject = require('gulp-inject');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var connectLr = require('connect-livereload');

// constants
var BASE_PATH = 'app/';
var DIST_PATH = 'dist/';

var TS_FILES = [BASE_PATH + '**/*.ts'];
var JS_FILES = [BASE_PATH + '**/*.js'];
var CSS_FILES = [BASE_PATH + '**/*.css'];
var SASS_FILES = [BASE_PATH + '**/*.scss'];
var SPEC_FILES = [BASE_PATH + '**/*.spec.js'];
var HTML_FILES = ['index.html', BASE_PATH + '**/*.html'];

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

gulp.task('test', function() {
	return gulp
		.src('')
		.pipe(shell([
			'karma start'
		]));
	//return gulp
	//	.src([
	//		'test-main.js',
	//		'app/**/*.js',
	//		'!app/main.js'
	//	])
	//	.pipe(karma({
	//		action: 'watch',
	//		//files: SPEC_FILES,
	//		configFile: 'karma.conf.js'
	//	}));
});

gulp.task('ts', function() {
	return gulp
		.src(TS_FILES)
		.pipe(sourcemaps.init())
		.pipe(ts({
			module: 'amd',
			typescript: typescript
		})).js
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(BASE_PATH));
});

gulp.task('scss', function() {
	return gulp
		.src(SASS_FILES)	
		.pipe(sass())
		.pipe(gulp.dest(BASE_PATH));
});

gulp.task('watch:webstorm', function() {
	gulp.watch(CSS_FILES, notifyLr);
	gulp.watch(HTML_FILES, notifyLr);
	gulp.watch(SASS_FILES, scssChanged);
});

gulp.task('watch', ['watch:webstorm'], function() {
	gulp.watch(TS_FILES, ['ts']);
});

gulp.task('default', ['express','scss', 'index', 'watch', 'test']);

//does not include compiling .ts files since they are handled by webstorm
gulp.task('webstorm', ['express', 'scss', 'index', 'watch:webstorm', 'test']);