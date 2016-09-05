
/**
 * SEE nightwatch.conf.js for nightwatch Configuration
 */
var gulp = require('gulp-param')(require('gulp'), process.argv),
    nightwatch  = require('gulp-nightwatch'),

    connect = require('gulp-connect'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util');


// Task to run nightwatch and functional tests (local)
gulp.task('nightwatch', function() {
  return gulp.src('')
   .pipe(nightwatch({
     configFile: 'nightwatch.conf.js'
   })).on('error', function(err) {
     throw new gutil.PluginError("nightwatch", err);
   }).on('end', function () {
     connect.serverClose();
     gulp.src('').pipe(notify("Test integration end!"));
   })
});

// Run server with "connect" task from the "gulpfile.js"
gulp.task('nightwatch:integration', ['connect', 'nightwatch'])
