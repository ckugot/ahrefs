// Copy assets/vendors/bootstrap/assets/fonts/bootstrap -> assets/fonts
// Copy assets/vendors/bootstrap/assets/javascripts/bootstrap.min.js -> assets/javascripts
// Process SASS (autoprefixer. minify,


'use strict';

const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const watcher = gulp.watch('./assets/stylesheets/scss/**/*.scss', ['scss']);

gulp.task('scss', function () {
    return sass('./assets/stylesheets/scss/**/*.scss', {
        precision: 6,
        scss: true,
        sourcemap: false,
        style: 'compact',
        stopOnError: true,
        cacheLocation: './.sass-cache',
        loadPath: ['./webapp/src/main/webapp/css/scss/']
    })
        .on('error', sass.logError)
        .pipe(cleanCss({
            keepBreaks: 'true'
        }))
        .pipe(autoprefixer({
            browsers: ['IE >= 9', '> 1%', 'last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./assets/stylesheets'));

});


watcher.on('change', function (event) {
    console.log(event.path.replace(/^.*[\\\/]/, '') + " has " + event.type);
});
