const gulp = require('gulp');
const gulp_sass = require('gulp-sass');
const gulp_cssnano = require('gulp-cssnano');
const gulp_htmlmin = require('gulp-htmlmin');
const gulp_concat = require('gulp-concat');
const gulp_minify = require('gulp-minify');
const gulp_imagemin = require('gulp-imagemin');
const del = require('del');

gulp_sass.compiler = require('sass');

//HTML
gulp.task('html', function(){
  return gulp.src('src/*.html')
        .pipe(gulp_htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./assets-prod'));
})

//SASS
gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
          .pipe(gulp_sass().on('error', gulp_sass.logError))
          .pipe(gulp_cssnano())
          .pipe(gulp.dest('./assets-prod'));
});

//MEDIA
gulp.task('media', function() {
  return gulp.src('src/media/**/*')
        .pipe(gulp_imagemin())
        .pipe(gulp.dest('./assets-prod/media/'));
});

//JS
gulp.task('script', function(){
  return gulp.src('src/scripts/**/*.js')
        .pipe(gulp_minify())
        .pipe(gulp_concat('script'))
        .pipe(gulp.dest('./assets-prod/script'));
})

gulp.task('delete', () => {
  console.log('[del module] Deleted files and directories:\n');
  return del(['./assets-prod/*']);
})

//Organizing tasks executions using series() and parallel API
exports.default = gulp.series('delete',gulp.parallel('html', 'script', 'sass', 'media'));
