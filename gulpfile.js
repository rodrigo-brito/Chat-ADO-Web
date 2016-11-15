var gulp = require('gulp'),
connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

gulp.task('reload', function () {
	gulp.src(['./**/*.html', './**/*.css', './**/*.js'])
	.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./**/*.html', './**/*.css', './**/*.js'], ['reload']);
});

gulp.task('default', ['connect', 'watch']);