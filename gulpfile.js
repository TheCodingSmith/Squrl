var gulp = require('gulp');
var pug = require('gulp-pug');
var path = require('path');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();

var paths = {
  pug: ['pug/**/*.pug']
};

gulp.task('browser-sync', ['sass', 'pug'], function() {
    bs.init({
        server: {
            baseDir: "www/app"
        }
    });
});

function callback(file) {
  if (file.path.search('index') !== -1) {
    return 'www/app/';
  }
  var folder = path.basename(file.path).replace(/\..*html/, '/');
  return 'www/app/' + folder;
}
gulp.task('pug', function(done) {
  gulp.src('pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(callback))
    .on('end', done);
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('css'))
                .pipe(bs.reload({stream: true}));
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
		gulp.watch(paths.pug, ['pug']);
});
