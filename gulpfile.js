// VENDOR LIBS
var browserify = require('browserify');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var path = require("path");
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var paths = [
    'main.js',
    'components/**/*.js',
    'lib/**/*.js',
    'flux/**/*.js'
];
var scssPaths = [
    '*.scss',
    'components/**/*.scss'
];

var handleErrors = function () {
    notify.onError({
        message: "<%= error.message %>"
    }).apply(this, arguments);

    this.emit('end');
};

gulp.task('lint', function () {
    return gulp.src(paths)
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('bundle', function () {
    return browserify({
            entries: 'main.js', debug: true,
            paths: [path.join(__dirname)],
        })
        .transform('babelify', {
            plugins: ['transform-class-properties'],
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', handleErrors)
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('bundle-prod', function () {
    return browserify({
            entries: 'main.js',
            paths: [path.join(__dirname)],
        })
        .transform('babelify', {
            plugins: ['transform-class-properties'],
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src(scssPaths)
        .pipe(scsslint({config: 'lint.yml'}))
        .pipe(concat('globals.scss'))
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(concat('styles.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('sass-prod', function () {
    gulp.src(scssPaths)
        .pipe(concat('globals.scss'))
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['lint', 'bundle'], function () {
    return gulp.src(['index.html', 'style.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-prod', ['bundle-prod', 'sass-prod'], function () {
    return gulp.src(['index.html', 'style.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('rimraf', function () {
    rimraf.sync('dist');
});

gulp.task('watch', ['copy', 'sass'], function () {
    livereload.listen(35680);
    gulp.watch(paths, ['copy']);
    gulp.watch(scssPaths, ['sass']);
});

gulp.task('start', ['rimraf', 'watch'], function () {
    nodemon({
        script: 'server.js',
        watch: 'server.js',
        env: {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('heroku:production', ['copy-prod']);

gulp.task('default', ['start']);
