var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    browserify   = require('gulp-browserify'),
    concatCss    = require('gulp-concat-css'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglify'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    gulpif       = require('gulp-if'),
    webserver    = require('gulp-webserver'),
    rename       = require("gulp-rename"),
    path         = require('path'),
    swPrecache   = require('sw-precache'),
    autoprefixer = require("gulp-autoprefixer"),
    sass         = require("gulp-sass");

var src         = './process',
    dest        = './app',
    // environment = 'production || development';
    environment = 'production';

gulp.task('generate-service-worker', function (callback) {
  swPrecache.write(path.join(dest, 'service-worker.js'), {
    staticFileGlobs: [dest + '/**/*.{js,html,json,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: dest
  }, callback);
});


gulp.task('js', function () {
  return gulp.src(src + '/js/app.js')
  .pipe(browserify())
  .pipe(gulpif(environment === 'production', uglify()))
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest(dest + '/js'));
});

gulp.task('html', function () {
});

// CSS task
gulp.task('css', function () {
  gulp.src(src + '/scss/app.scss')
  .pipe(sass({
    outputStyle: "expanded",
    sourcemaps: true
  }))
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(dest + "/css"))
  .pipe(gulpif(environment === 'production', cleanCSS()))
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(dest + "/css"))
});

// gulp.task('css', function () {
//   gulp.src(src + '/css/app.css')
//       .pipe(concatCss('app.css', {rebaseUrls: false}))
//       .pipe(gulpif(environment === 'production', cleanCSS()))
//       .pipe(gulp.dest(dest + '/css'));
// });

gulp.task('watch', function () {
  gulp.watch([src + '/js/**/*', dest + '/data/**/*'], ['generate-service-worker', 'js']);
  gulp.watch(src + '/scss/*.scss', ['generate-service-worker', 'css']);
  gulp.watch(dest + '/*.html', ['generate-service-worker', 'html']);
});

gulp.task('webserver', ['generate-service-worker', 'html', 'css', 'js'], function () {
  gulp.src(dest)
  .pipe(webserver({
    livereload: true,
    open: true
  }));
});

gulp.task('default', ['watch', 'webserver']);
