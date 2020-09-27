const gulp = require('gulp');
const gulp_sass = require('gulp-sass');
const gulp_cssnano = require('gulp-cssnano');
const gulp_htmlmin = require('gulp-htmlmin');
const gulp_concat = require('gulp-concat');
const gulp_minify = require('gulp-minify');
const gulp_imagemin = require('gulp-imagemin');
const gulp_replace = require('gulp-replace');

const del = require('del');

gulp_sass.compiler = require('sass');

//HTML
const copyHTML = () => {
  return gulp.src('src/*.html')
        .pipe(gulp_htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./assets-prod'));
}
gulp.task('html', copyHTML)

//SASS
const delFinalSassTask = () => {
  console.log('[del module] Deleted sass files. \n');
  return del(['./assets-prod/style/sass/*']);
}

const compileSassTask = () => {
    return gulp.src('src/**/*.scss')
          .pipe(gulp_sass(
            /*including css files from normalize.css package in the paths,
            so sass can see then when resolving @imports
            */
            {includePaths: ['/node_modules/normalize.css/']})
            .on('error', gulp_sass.logError))
          .pipe(gulp_cssnano())
          .pipe(gulp.dest('./assets-prod'));
};

gulp.task('compileSass', compileSassTask);
gulp.task('delFinalSass', delFinalSassTask);

//MEDIA
gulp.task('media', function() {
  return gulp.src('src/media/**/*')
        .pipe(gulp_imagemin())
        .pipe(gulp.dest('./assets-prod/media/'));
});

//JS
gulp.task('script', function(){
  return gulp.src('src/scripts/**/*.js')
        .pipe(gulp_concat('scripts.js'))
        .pipe(gulp_minify())
        .pipe(gulp.dest('./assets-prod/script/index/'));
})

gulp.task('delete', () => {
    return del(['./assets-prod/*']);
})

//Create GitHub Pages doc folder
const createDocFolder = () => {
  del(['./docs/*']);
  return gulp.src('assets-prod/**/*.*')
        .pipe(gulp_replace('../assets-prod/', ''))
        .pipe(gulp.dest('docs'));
}
gulp.task('createDoc', createDocFolder);

//Watch
const watchSass = gulp.watch(
  ['src/**/*.scss','src/**/*.html'],
  gulp.series(
    copyHTML,
    delFinalSassTask,
    compileSassTask,
    createDocFolder
  ));



//Organizing tasks executions using series() and parallel API
exports.default = gulp.series('delete',gulp.parallel('html', 'script', 'compileSass', 'media'), 'createDoc');
exports.watchSass = this.watchSass;
