var gulp = require('gulp'),
		uglyfly = require('gulp-uglyfly'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		imageMin = require('gulp-imagemin'),
		browserSync = require('browser-sync').create();

//Browsersync
gulp.task('server', ['sass', 'js'], function() {
  browserSync.init({
      server: {
        baseDir: "./"
      }
  });

  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch('js/main.js', ['js-watch']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

//Compile SCSS to CSS
gulp.task('sass', function() {
	return sass('scss/**/*.scss', {
		noCache: true,
		style: 'compressed' 
	})
	.on('error', sass.logError)
	.pipe(autoprefixer({
    browsers: ['last 3 versions', '> 5%'],
    cascade: false
  }))
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream()); 
});

//Minify JS
gulp.task('js', function() {
  return gulp.src('js/main.js')
    .pipe(uglyfly())
    .pipe(gulp.dest('js/min'));
});

// create a task that ensures the `js` task is complete before reloading browsers
gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

//Image Compression
gulp.task('images', function()  {
  gulp.src('img/*')
      .pipe(imageMin())
      .pipe(gulp.dest('img/'));
});

gulp.task('default', ['images', 'js', 'sass', 'server']);