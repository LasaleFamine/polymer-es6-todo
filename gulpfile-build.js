/*
Imports
========================
*/
var gulp = require('gulp-param')(require('gulp'), process.argv),
    rename = require("gulp-rename"),
    path = require('path'),
    fs = require('fs'),
    vulcanize = require('gulp-vulcanize'),
    concat = require('gulp-concat'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    minifyCSS = require('gulp-clean-css'),
    gutil = require("gulp-util"),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify');


var conf = {
  indexPath: './app/index.html',
  cssPath: './app/assets/css/*.css',
  imagesPath: './app/assets/images/*',
  distImages: './dist/assets/images/',
  distCSS: './dist/assets/css/',
  distBase: './dist/'
}

/// Minify and concat CSS files in one single bundle
gulp.task('build-css', function(){
    gulp.src([
      conf.cssPath
    ])
    .pipe(minifyCSS( {processImport: false} ))
    .pipe(gulp.dest(conf.distCSS));
    console.log('* CSS build complete!');
});


/*
HTML and JS
========================
*/
/// Polymer components build
gulp.task('vulcanize', function () {
    return gulp.src(conf.indexPath)
        .pipe(vulcanize({
            abspath: '',
            stripComments: true,
            inlineScripts: true,
            inlineStyles: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(conf.distBase));
    console.log('* Polymer components build complete!');
});

gulp.task('webpack-build', function() {
  var config = Object.assign({}, webpackConfig);
  return gulp.src('./app/index.js')
  .pipe(webpack(config))
  .pipe(notify('Build end!'))
  .pipe(gulp.dest(conf.distBase));
});

// Copy images
gulp.task('images-build', function() {
  return gulp.src(conf.imagesPath)
    .pipe(imagemin())
    .pipe(gulp.dest(conf.distImages));
});

// Copy manifest
gulp.task('copy-manifest', function() {
    gulp.src('./app/manifest.json')
    .pipe(gulp.dest('./dist'));
});
// Copy fonts
gulp.task('copy-fonts', function() {
    gulp.src('./app/assets/fonts/*')
    .pipe(gulp.dest('./dist/assets/fonts/'));
});

// Copy fonts
gulp.task('copy-files', ['copy-manifest', 'copy-fonts'], function() {
    gulp.src('./app/assets/fonts/*')
    .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('super-build', ['vulcanize', 'build-css', 'webpack-build', 'images-build', 'copy-files']);
