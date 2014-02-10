// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

// Styles tasks
gulp.task('styles', function() {
    gulp.src('./assets/less/*.less')
        .pipe(less({ compress: true }).on('error', gutil.log))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('less', function() {
    gulp.src('./assets/less/**/*.less')
        .pipe(gulp.dest('dist/less/'));
});


// Scripts tasks

gulp.task('scripts', function() {
    gulp.src('./assets/js/**/*.js')
        .pipe(gulp.dest('dist/js/'));
});


// Images tasks
gulp.task('icons', function() {
    gulp.src('./assets/images/**/*.svg')
        .pipe(gulp.dest('dist/images/'));
});



// Clean
gulp.task('clean', function() {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

// Prod task
gulp.task('prod', ['clean'], function() {
    gulp.run('less');
    gulp.run('scripts');
    gulp.run('icons');
});

// Dev task (Watch)
gulp.task('dev', function() {
    // Watch .less files
    gulp.watch('assets/less/**/*.less', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('styles');
    });

    // Watch JS files
    gulp.watch('assets/js/**/*.js', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('scripts');
    });
});