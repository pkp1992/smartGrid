const gulp = require("gulp");
const { src, dest, parallel, series } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const gulpif = require("gulp-if");
const less = require("gulp-less");
const gcmq = require("gulp-group-css-media-queries");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const smartgrid = require("smart-grid");
// const uncss = require("gulp-uncss");

const isDev = process.argv.indexOf("--dev") !== -1;
const isProd = process.argv.indexOf("--prod") !== -1;
const sync = process.argv.indexOf("--sync") !== -1;

let allHtml = [
  "./src/*.html",
  "./src/*.php",
];

function clear() {
  return del("build/*");
}

function styles() {
  return (
    src("./src/css/styles.less")
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(less())
      // .pipe(concat("style.css"))
      .pipe(gcmq())
      .pipe(
        autoprefixer({
          cascade: false
        })
      )
      .pipe(gulpif(isProd, cleanCss({ compatibility: "ie8", level: 2 })))
      .pipe(gulpif(isDev, sourcemaps.write()))
      .pipe(dest("build/css"))
      .pipe(gulpif(sync, browserSync.stream()))
  );
}
function html() {
  return src(allHtml)
    .pipe(dest("build"))
    .pipe(gulpif(sync, browserSync.stream()));
}
function mailer() {
  return src("./src/phpmailer/*").pipe(dest("build/phpmailer"));
}
function fonts() {
  return src("./src/Fonts/*")
    .pipe(dest("build/Fonts"))
}

function img() {
  return src("./src/img/*")
    .pipe(imagemin())
    .pipe(dest("build/img"));
}

function scripts() {
  return src("./src/js/*.js")
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(
      gulpif(
        isProd,
        babel({
          presets: ["@babel/env"]
        })
      )
    )
    .on("error", console.error.bind(console))
    .pipe(concat("main.js"))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(isDev, sourcemaps.write(".")))
    .pipe(dest("build/js"))
    .pipe(gulpif(sync, browserSync.stream()));
}

function watch() {
  if (sync) {
    browserSync.init({
      server: {
        baseDir: "./build"
      }
    });
    gulp.watch("./src/css/**/*.less", styles);
    gulp.watch("./src/*.html", html);
    gulp.watch("./src/js/**/*.js", scripts);
    gulp.watch("./smartgrid.js", grid);
    gulp.watch("./src/img/*", img);
  }
}

function grid(done) {
  delete require.cache[require.resolve("./smartgrid.js")];
  let settings = require("./smartgrid.js");
  smartgrid("./src/css", settings);
  done();
}

let build = series(clear, parallel(fonts, mailer, styles, scripts, html, img));
exports.build = build;
exports.grid = grid;
exports.watch = series(build, watch);
