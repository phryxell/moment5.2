const { src, dest, watch, series, parallel  } = require("gulp");
var concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

// Src
const files = {
    htmlPath: "src/**/*.html",
    imgPath: "src/images/*",
    sassPath: "src/sass/**/*.scss",
    jsPath: "src/**/*.js"
}

// Copy HTML
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub')
    );
}

// Copy Sass and return as CSS
function styleTask() {
    return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('pub/css'));
}

// Copy Images and minify them
function imageMin() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('pub/images')
    );
}

// Concat and minify js-files
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('pub/js')
    );
}

// Watch tasks
function watchTask() {
    browserSync.init({
        server: {
            baseDir: './pub/'
        }
    })
    watch(files.htmlPath, copyHTML).on('change', browserSync.reload);
    watch(files.imgPath, imageMin).on('change', browserSync.reload);
    watch(files.jsPath, jsTask).on('change', browserSync.reload);
    watch(files.sassPath, styleTask).on('change', browserSync.reload);
}

// Default task
exports.default = series(
    parallel(copyHTML, jsTask, imageMin, styleTask),
    watchTask
);
