
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');


gulp.task('default', function() {
    livereload.listen();
    gulp.watch(['app/**/*.html'], function(event) {
        livereload.changed(event.path);
    });

    gulp.watch(['app/css/scss.css'], function(event) {
        livereload.changed(event.path);
    });

    gulp.watch(['app/scss/*.scss'], function(event) {
        gulp.start('scss');
    });
});


gulp.task('scss', function() {
    gulp.src("app/scss/scss.scss")
        .pipe(sass())
        .pipe(postcss())
        .pipe(gulp.dest("app/css/"));
});
 













