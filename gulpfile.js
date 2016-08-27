'use strict';

const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.watch('./assets/stylesheets/scss/**/*.scss', ['scss']);

gulp.task('default', ['vendors','scss']);

gulp.task('scss', function() {
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

gulp.task('vendors', function() {
    // Concat, minify and copyJS
    gulp.src([
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
            './node_modules/bootstrap-carousel-swipe/carousel-swipe.js'
        ])
//        .pipe(uglify())
        .pipe(gulp.dest('./assets/javascripts/'));

    // Copy Bootstrap fonts
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('./assets/fonts'))
});
