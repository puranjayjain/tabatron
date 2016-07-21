var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('fonts', function () {
	return gulp.src(config.fonts.glob)
	.pipe(gulp.dest(config.fonts.dest))
	.pipe(browserSync.reload({
		stream: true
	}));
});
