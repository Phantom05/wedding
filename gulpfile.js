const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');
const imgmin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const jsminify = require('gulp-js-minify');
const obf = require('gulp-obfuscate');
const pkg = require("./package.json");

// const uglify = require('gulp-uglify');
// devDependencies에 있는 모든 플러그인을 $ 변수에 로딩합니다
const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

let SRC = {
  HTML:"./public/src/**/*.{html,htm}",
  SCSS:"./public/src/**/*.scss",
  JS:"./public/src/**/*.js",
  IMG:"./public/dist/**/*.{jpg,png,gif,svg}"
};
let DIST ={
  HTML:"./public/dist/",
  CSS:"./public/dist/",
  JS:"./public/dist/",
  IMG:"./public/dist/"
}; 

gulp.task("htmlmin", ()=>{
  return gulp.src(SRC.HTML)
  .pipe(htmlmin())
  .pipe(gulp.dest(DIST.HTML))
});

gulp.task("sass", ()=>{
  return gulp.src(SRC.SCSS)
  .pipe(sass().on('error', sass.logError))
  .pipe(uglifycss())
  .pipe(gulp.dest(DIST.CSS))
});

gulp.task("babel", () =>{
  return gulp.src(SRC.JS)
  .pipe(babel())
  .pipe(jsminify())
  // .pipe(obf({replaceMethod:obf.LOOK_OF_DISAPPROVAL}))
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(DIST.JS+'assets/js'))
});

gulp.task("imgmin", ()=>{
  return gulp.src(SRC.IMG)
  .pipe(imgmin())
  .pipe(gulp.dest(DIST.IMG))
});

gulp.task("watch", ()=>{
  let watcher ={
    js:gulp.watch(SRC.JS,["babel"]),
    scss:gulp.watch(SRC.SCSS,["sass"]),
    img:gulp.watch(SRC.IMG,["imgmin"])
  }
});


gulp.task("default", ["htmlmin","babel","sass","imgmin","watch"], ()=>{
  console.log('Gulp is running!')
})
