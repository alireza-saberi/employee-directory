/*
* @Author: Ali
* @Date:   2017-03-02 10:01:23
* @Last Modified by:   Ali
* @Last Modified time: 2017-03-02 15:02:24
*/

'use strict';
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const processhtml = require('gulp-processhtml');
const htmlmin = require('gulp-htmlmin');
// const watch = require('gulp-watch');
const path = require('path');
const jsdoc = require('gulp-jsdoc3');
const ghpages = require('gh-pages');

// html
gulp.task('process-html', () => {
    return gulp.src('./app/*.html').pipe(processhtml()).pipe(gulp.dest('./dist'));
});

gulp.task('minify-html', ['process-html'],() => {
    return gulp.src('./dist/*.html').pipe(htmlmin({collapseWhitespace: true})).pipe(gulp.dest('./dist'));
});


// css
gulp.task('sass', () => {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/sass/css'));
});

gulp.task('concat-css', ['sass'],() => {
    return gulp.src(['./app/node_modules/bootstrap/dist/css/bootstrap.css', './app/sass/css/**/*']).pipe(concat('main.css')).pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', ['concat-css'], () => {
  return gulp.src('./dist/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
});

// images
gulp.task('images', () => {
    return gulp.src('app/images/**/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
    }
);

// JS
gulp.task('js-concat', () => {
    return gulp.src(['./app/node_modules/angular/angular.js','./app/node_modules/angular-ui-router/release/angular-ui-router.js', './app/js/app.js']).pipe(concat('main.js')).pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-js', ['js-concat'], () => {
    gulp.src('./dist/js/main.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/js'));
});

// watcher
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch('./app/*.html', ['minify-html']);
    gulp.watch('./app/scss/**/*.scss', ['minify-css']);
    gulp.watch('./app/js/**/*', ['minify-js']);
    gulp.watch('./app.images/**/*', ['images']);
});

// docs
gulp.task('build-doc', (cb) => {
    var config = require('./jsdoc.conf.json');
    gulp.src(['./app/js/**/*.js', './server.js', './routes/route.js'], {read: false})
        .pipe(jsdoc(config , cb));
});

gulp.task('publish-doc', ['build-doc'], () => {
    ghpages.publish(path.join(__dirname, 'out'), console.error);
});

// default
gulp.task('default', ['images', 'minify-js', 'minify-css', 'minify-html'], () => {
    // This will only run if the dependency tasks are successful...
});