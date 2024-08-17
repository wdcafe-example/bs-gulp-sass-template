// Plug Loads
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cssMin = require('gulp-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const { src, dest, series, parallel, watch } = require('gulp');


// Task Settings
// scss task
function scssTask(){
  return gulp.src('./scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./css/'))   // main.css 로 번들링 됨!
    .pipe(browserSync.stream());
}

// CSS Task - CSS 파일 병합 및 압축작업
function cssTask(){
  return src('./css/*.css')
  .pipe(concat('main.css'))
  .pipe(cssMin())
  .pipe(gulp.dest('./dist/css'));
}


// JS Task - JS 파일 병합 및 압축작업 
function jsTask(){
  return src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    './js-task/main-task.js' 
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
}

// Clean Task - dist 폴더 삭제 작업
function cleanDist() {
  return src('dist', { allowEmpty: true })
    .pipe(clean());
}
 

// Copy Task - 파일 복사 작업
function copyIndex(){
  return src('./*.html').pipe(gulp.dest('dist/'));
}

function copyHtml(){
  return src('./html/*').pipe(gulp.dest('dist/html'));
}

function copyJS(){
  return src('./js/*.js').pipe(gulp.dest('dist/js'));
}

function copyImage(){
  return src('./images/**/*').pipe(gulp.dest('dist/images'));
}

// function copyFont(){
//   return src('./fonts/*').pipe(gulp.dest('dist/fonts'));
// }

// function copyVideo(){
//   return src('./video/*').pipe(gulp.dest('dist/video'));
// }

  
// watch task
function watchTask(){
  // server settings
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000,
    // notify: false, // 브라우저 알림 비활성화
  });

  // task watch
  gulp.watch('./scss/*.scss', scssTask); // scss 폴더의 SCSS 파일 변경 시 scssTask 실행
  gulp.watch('./js-task/*.js', jsTask); // js-task 폴더의 JS 파일 변경 시 jsTask 실행
  gulp.watch('./html/*.html').on('change', browserSync.reload);
  gulp.watch('./js/*.js').on('change', browserSync.reload);
  gulp.watch('./css/*.css').on('change', browserSync.reload);
}
 

// Export Settings
exports.scssTask = scssTask;
exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.copyIndex = copyIndex;
exports.copyHtml = copyHtml;
exports.copyJS = copyJS;
exports.copyImage = copyImage;
exports.watchTask = watchTask;
exports.cleanDist = cleanDist;
// exports.copyFont = copyFont;
// exports.copyVideo = copyVideo;


// 처리할 Task(작업)이 많을 경우
exports.default = series(cleanDist, parallel(scssTask, jsTask, cssTask, copyIndex, copyHtml, copyJS, copyImage), watchTask);