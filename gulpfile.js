
// All requires for every task

var gulp = require('gulp-param')(require('gulp'), process.argv),
    connect = require('gulp-connect'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    bump = require('gulp-bump'),
    watch = require('gulp-watch');

// Include the build actions
require('./_gulpfile-build.js');
require('./_gulpfile-integration-test.js');


// ### Actions

// Server
gulp.task('connect', function (port) {
  !port ? port = 3000 : port;
  connect.server({
    root: 'app',
    port: port
  });
});

// Load the configuration file and execute Webpack using `./app/index.js` as entry point
gulp.task('webpack', function() {
  var config = Object.assign({}, webpackConfig);
  return gulp.src('./app/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('app'));
});

// Watch every .js file for changes except bundle.js and run the Webpack action, plus it prints out on the terminal which files has changed
gulp.task('watch-npm', function(){
  gulp.watch(['./app/**/*.js','!./app/bundle.js'], ['webpack']);
  gulp.watch(['./app/**/*.js','!./app/bundle.js'], function(arg){
    console.log('File changed ==> ', arg)
  });
});

// Bumping task
gulp.task('bump', function(type){
  if(!type) {
    return gulp.src('./*.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
  }
  return gulp.src('./*.json')
  .pipe(bump({type:type}))
  .pipe(gulp.dest('./'));
});

gulp.task('dev', ['connect','watch-npm']);

// Runs the production build process
gulp.task('build', ['super-build']);

// Tests
gulp.task('test:integration', ['nightwatch:integration']);
