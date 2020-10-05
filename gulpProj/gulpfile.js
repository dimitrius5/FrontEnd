const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sassGLOB = './app/sass/**/*.+(sass|scss)';

const concatJS = require('gulp-concat');
const minifyJS = require('gulp-uglifyjs');
const concatCSS = require('gulp-concat-css');
const minifyCSS = require('gulp-cssnano');

function SASS(cb) {
    src()
        .pipe( sourcemaps.init(sassGLOB) )
        .pipe( sass({outputStyle: 'compact'}).on('error', sass.logError) )
        .pipe( autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7']) )
        .pipe( sourcemaps.write() )
        .pipe( dest('./app/css') )
        .pipe(browserSync.stream())
    
    //cb();
}

function liveReload(cb) {
    browserSync.init({
        server: {
            baseDir: './app'
        },
        notify: false
    });
    watch(['./app/**/*.html', './app/js/**/*.js']).on('all', browserSync.reload);
    watch([sassGLOB]).on('all', SASS)
    cb();
}

function bundleCSS(cb) {
    src([
        './node_modules/slick-carousel/slick/slick.css',
        './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'
    ]).pipe(concatCSS('libs.min.css'))
      .pipe(minifyCSS())
      .pipe(dest('./app/css'));

    cb();
}

function bundleJS(cb) {
    src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        './node_modules/slick-carousel/slick/slick.js'
    ]).pipe(concatJS('libs.min.js'))
      .pipe(minifyJS())
      .pipe(dest('./app/js'));

    cb();
}

exports.sass = SASS;
exports.watch = (SASS, liveReload);
exports.bundleCSS = bundleCSS;
exports.bundleJS = bundleJS;
exports.bundle = (bundleCSS, bundleJS);