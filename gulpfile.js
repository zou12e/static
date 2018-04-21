
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const sequence = require('gulp-sequence'); 
const fs = require('fs');
const pump = require('pump');
const clean = require('gulp-clean');

gulp.task('default', function() {
    livereload.listen();
    gulp.watch(['app/**/*.html'], function(event) {
        livereload.changed(event.path);
    });

    gulp.watch(['app/css/scss.css'], function(event) {
        gulp.start('seq');
    });

    gulp.watch(['app/scss/**/*.scss'], function(event) {
        gulp.start('scss');
    });
});


gulp.task('scss', function() {
    gulp.src("app/scss/scss.scss")
        .pipe(sass())
        .pipe(postcss())
        .pipe(gulp.dest("app/css/"));
});

gulp.task('seq',function(cb){
    sequence('clean', 'rev-css','replace', cb);
})

gulp.task('rev-css', function() {
    return gulp.src("app/css/scss.css")
    .pipe(rev())
    .pipe(gulp.dest('app/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev'));
 });

gulp.task('replace', function() {
    return gulp.src(['./rev/*.json', 'app/**/*.html'])
    .pipe(revCollector({
        replaceReved: true 
    }))
    .pipe(gulp.dest('app/'));
});


gulp.task('clean', function(cb) {
    pump([
        gulp.src('app/css/scss-*.css'),
        clean()
    ], cb)
})

 
gulp.task('fs',function(){
    fs.writeFileSync('./rev/rev-manifest.json', `{ "scss.css": "scss.css?lib=${new Date().getTime()}" }`,  function(err) {
        if (err) {
            return console.error(err);
        }
    });
    return gulp;
});












