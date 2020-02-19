var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var copy = require('gulp-copy');


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

gulp.task('js-lorem', function(){
  return gulp.src(['node_modules/loremjs/lorem.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('lorem.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./'))
});

gulp.task('css-mapbox', function () {
  var sourceFiles = ['node_modules/mapbox-gl/dist/mapbox-gl.css'];
  var destination = './dist/css/';
  return gulp
      .src(sourceFiles)
      .pipe(copy(destination, { prefix: 4 }))
});

gulp.task('js-mapbox', function () {
  var sourceFiles = ['node_modules/mapbox-gl/dist/mapbox-gl.js'];
  var destination = './dist/js/';
  return gulp
      .src(sourceFiles)
      .pipe(copy(destination, { prefix: 4 }))
});

gulp.task('js', gulp.series('js-app', 'js-lorem'));
gulp.task('mapbox', gulp.series('css-mapbox', 'js-mapbox'));

gulp.task('default', gulp.series('css', 'js', 'mapbox'));