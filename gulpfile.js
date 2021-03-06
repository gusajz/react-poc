'use strict';

var gulp = require('gulp');


var paths = {
    src: {
        root: 'src',
        less: 'src/less',
        js: 'src/js'
    },
    build: {
        root: 'build',
        css: 'build/css',
        js: 'build/js',
        html: 'build'
    }
}


var path = require('path');
var sources = {
    main: path.join(__dirname, paths.src.js, 'app.js'),
    html: path.join(paths.src.root, '*.html'),
    less: path.join(paths.src.less, '**/*.less'),
    js: path.join(paths.src.js, '**/*.js*')
}


function browserifyTask() {
    var watchify = require('watchify');
    var assign = require('lodash.assign');
    var sourcemaps = require('gulp-sourcemaps');
    var browserify = require('browserify');
    var babelify = require("babelify");
    var reactify = require('reactify');
    var buffer = require('vinyl-buffer');
    var source = require('vinyl-source-stream');

    var customOpts = {
        entries: [ sources.main ],
        debug: true
    }

    var opts = assign({}, watchify.args, customOpts);

    var bundleStream = watchify(browserify(opts)
        .transform(reactify))
        .transform(babelify.configure({sourceMap: true}))
        .bundle()
        .on('error', function(err) {
            console.error('Browserify Error', err.toString());
        });

    return bundleStream
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.js));

}

gulp.task('js', function() { 
    browserifyTask()
});

gulp.task('clean', function(cb) {
    var del = require('rimraf');

    del(paths.build.root, cb);
});


gulp.task('css', function() {
    var less = require('gulp-less');

    return gulp.src(sources.less)
        .pipe(less({
            paths: [] // TODO: Import directives path
        }))
        .pipe(gulp.dest('build/css'))
});


gulp.task('server', ['css', 'js', 'html', 'watch'], function() {
    var connect = require('gulp-connect');

    console.log('Server for: ' + paths.build.root);

    connect.server({
        root: [paths.build.root],
        port: 8000,
        livereload: true
    });
});

gulp.task('html', function() {

    gulp.src(sources.html)
        .pipe(gulp.dest(paths.build.html));
});

gulp.task('watch', function() {
    gulp.watch(sources.html, ['html']);
    gulp.watch(sources.less, ['css']);
    gulp.watch(sources.js, ['js']);
});


gulp.task('default', ['css', 'js']);