import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import rename from "gulp-rename";
import browserSync from "browser-sync";

const bs = browserSync.create();
const sassCompiler = gulpSass(dartSass);

// Динамический импорт для del
const del = (await import("del")).deleteAsync;

// Paths
// Paths
const paths = {
  styles: {
    src: "app/scss/**/*.scss",
    dest: "app/css/",
  },
  scripts: {
    src: "app/js/**/*.js",
    dest: "app/js/",
  },
  vendorStyles: {
    src: [
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
      "node_modules/fullpage.js/dist/fullpage.css",
    ],
    dest: "app/css/",
  },
  vendorScripts: {
    src: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/slick-carousel/slick/slick.min.js",
      "node_modules/fullpage.js/dist/fullpage.min.js",
    ],
    dest: "app/js/",
  },
};

// Clean assets
function clean() {
  return del(["dist"]);
}
//////////////////////////////////////////
gulp.task("css", function () {
  return gulp.src([
    "node_modules/normalize.css/normalize.css",
    "node_modules/slick-carousel/slick/slick.css",
    "node_modules/fullpage.js/dist/fullpage.css",
  ]);
});
gulp.task("js", function () {
  return gulp.src([
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/fullpage.js/dist/fullpage.js",
  ]);
});
////////////////////////////////////////////
// Compile SCSS into CSS
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(
      sassCompiler({ outputStyle: "compressed" }).on(
        "error",
        sassCompiler.logError
      )
    )
    .pipe(autoprefixer())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
}

// Copy vendor CSS
function vendorStyles() {
  return gulp
    .src(paths.vendorStyles.src)
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest(paths.vendorStyles.dest))
    .pipe(bs.stream());
}
// Copy vendor JS
function vendorScriptsTask() {
  return gulp
    .src(paths.vendorScripts.src)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(paths.vendorScripts.dest))
    .pipe(bs.stream());
}

// Minify JavaScript
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream());
}

// Watch files
function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch("*.html").on("change", bs.reload);
}

// BrowserSync
function browser() {
  bs.init({
    server: {
      baseDir: "./",
    },
  });
}

// Define complex tasks
const build = gulp.series(
  clean,
  gulp.parallel(styles, scripts, vendorStyles, vendorScriptsTask)
);

const watch = gulp.parallel(watchFiles, browser);

// Export tasks
export {
  clean,
  styles,
  scripts,
  vendorStyles,
  vendorScriptsTask,
  watch,
  build,
};
export default build;
