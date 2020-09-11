// Load the required modules
const { src, dest, watch, series, parallel  } = require("gulp");
var concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

// Set paths
const files = {
    htmlPath: "src/**/*.html",
    imgPath: "src/images/*",
    cssPath: "src/**/*.css",
    sassPath: "src/**/*.scss",
    jsPath: "src/**/*.js"
}

// Copy all HTML files to pub folder 
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub')
    );
}

/* 
 * Concatenate all CSS files into one file
 * Postcss used for simultaneously add vendor prefixes and minify code
 * Then move file to folder pub/css
 */
function cssTask() {
    return src(files.cssPath)
     .pipe(sourcemaps.init())
     .pipe(concat('main.css'))
     .pipe(postcss([autoprefixer(), cssnano()]))
     .pipe(sourcemaps.write('.')
     .pipe(dest('pub/css')));
}

/* 
 * Concatenate all SASS files into one file
 * Postcss used for simultaneously add vendor prefixes and minify code
 * Then move file to folder pub/css
 */
function styleTask() {
    return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('pub/css')
    );
}

// Minify all added images, then move them to folder pub/images
function imageMin() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('pub/images')
    );
}

/*
 * Concatenate all JS files into one file
 * Use terser to minify the code
 * Then move the new file to pub-folder
 */
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('pub/js')
    );
}

/*
 * Watch all folders and run their functions when changes occur
 * BrowserSync reacts to changes and reloads window
 */
function watchTask() {
    browserSync.init({
        server: {
            baseDir: './pub/'
        }
    })
    watch(files.htmlPath, copyHTML).on('change', browserSync.reload);
    watch(files.imgPath, imageMin).on('change', browserSync.reload);
    watch(files.jsPath, jsTask).on('change', browserSync.reload);
    watch(files.cssPath, cssTask).on('change', browserSync.reload);
    watch(files.sassPath, styleTask).on('change', browserSync.reload);
}

// Default, export all tasks, initialized by 'gulp' command
exports.default = series(
    parallel(copyHTML, jsTask, imageMin, styleTask, cssTask),
    watchTask
);
