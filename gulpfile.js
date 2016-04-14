var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var del = require('del');
var jshint = require('gulp-jshint');
var config = require('./config/build-config.js');

// 是不是能用bower的override替换掉这个？
gulp.task('copy', function() {
    return gulp.src(config().srcFiles.copy)
        .pipe(gulp.dest(config().buildPath.copy));
});

gulp.task('jshint', function() {
    return gulp.src(config().srcFiles.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minifyjs', ['jshint'], function() {
    return gulp.src(config().srcFiles.js)
        .pipe(concat(config().concat.js))
        .pipe(gulp.dest(config().buildPath.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(config().buildPath.js));
});

gulp.task('minifycss', function() {
    return gulp.src(config().srcFiles.css)
        .pipe(concat(config().concat.css))
        .pipe(gulp.dest(config().buildPath.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCss())
        .pipe(gulp.dest(config().buildPath.css));
});

// NOT USED.
gulp.task('clean', function(cb) {
    return del(config().del, cb);
});


gulp.task('develop', function() {
    livereload.listen();
    nodemon({
        script: 'bin/www', // start script  
        ext: 'js ejs', // js files and jade files will be watched.
        stdout: false // not output to the console.
    }).on('readable', function() { // data is ready to pick up.
        this.stdout.on('data', function(chunk) {
            if (/^Express server listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('default', ['minifyjs', 'copy', 'minifycss'], function() {
    gulp.start('develop');
});
