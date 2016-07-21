var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('babeled', function () {
	return gulp.src(config.babel.src)
	.pipe(babel())
	.pipe(gulp.dest(config.babel.dest))
	.pipe(browserSync.reload({
		stream: true
	}));
});
