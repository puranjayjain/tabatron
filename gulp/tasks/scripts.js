var gulp = require('gulp');
// var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('scripts', function () {
	return gulp.src(config.scripts.src)
	// .pipe(babel())
	.pipe(gulp.dest(config.scripts.dest))
	.pipe(browserSync.reload({
		stream: true
	}));
});
