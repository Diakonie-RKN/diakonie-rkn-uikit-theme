var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('css', function () {
  return gulp
    .src('site.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(rename('app.min.css'))
      .pipe(minifyCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
});

gulp.task('js-app', function(){
  return gulp.src(['node_modules/uikit/dist/js/uikit.js', 'node_modules/uikit/dist/js/uikit-icons.js', 'node_modules/umbrellajs/umbrella.js', 'site.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/js'))
});

gulp.task('js-lazy-sizes', function(){
  return gulp.src('node_modules/lazysizes/lazysizes.js')
      .pipe(uglify())
      .pipe(rename('lazysizes.min.js'))
      .pipe(gulp.dest('./js'))
});

gulp.task('js', gulp.series('js-app', 'js-lazy-sizes'));

gulp.task('default', gulp.series('css', 'js'));