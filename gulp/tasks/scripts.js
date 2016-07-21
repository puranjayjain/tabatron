var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('scripts', function () {
	return gulp.src(config.scripts.src)
	.pipe(gulp.dest(config.scripts.dest))
	.pipe(browserSync.reload({
		stream: true
	}));
});
