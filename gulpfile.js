const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');

var paths = {
    src         : "./src/",
    dist        : "./dist/",
    bootstrap   : "./node_modules/bootstrap/",
};

var js = {
    in: [
        paths.bootstrap + 'dist/js/bootstrap.bundle.min.js',
        paths.src + 'js/*.js'
    ],
    out: paths.dist  + 'js',
    watch: paths.src + 'js/*.js'
};

var scss = {
    in: [paths.src + 'scss/main.scss'],
    out: paths.dist + 'css',
    watch: paths.src + 'scss/**/*.scss',
    sassOpts: {
        outputStyle: 'compressed',
        precision: 3,
        errLogToConsole: true,
        sourcemap: true,
        includePaths: [
            paths.bootstrap + 'scss'
        ]
    }
};

function jsTask(){
    return src(js.in)
        .pipe(sourcemaps.init())
        .pipe(concat('jsBundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(js.out));
}

function scssTask(){
    return src(scss.in)
        .pipe(sourcemaps.init())
        .pipe(sass(scss.sassOpts))
        .pipe(concat('cssBundle.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(scss.out));
}

function htmlTask(){
    return src(paths.src + '*.html').pipe(dest(paths.dist));
}

function watchTask(){
    watch([js.watch, scss.watch, paths.src+'*.html'], {interval: 1000}, parallel(jsTask, scssTask, htmlTask));
}

exports.default = series(
    parallel(jsTask, scssTask, htmlTask)
);
exports.watchTask = watchTask;