'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
      .pipe(sass({
        errLogToConsole : true,
        sourceComments : true,
        includePaths : ['bower_components/foundation/scss']
      }).on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['sass']);