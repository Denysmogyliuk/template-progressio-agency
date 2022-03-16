import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import del from 'del';
import csso from 'gulp-csso';
import htmlmin from 'gulp-htmlmin';

// Styles

export const styles = () => {
  return gulp.src('src/less/style.less', { srcmaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso({
      restructure: false,
      srcMap: true,
      debug: true
  }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { srcmaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('src/js/script.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}


const copyImages = () => {
  return gulp.src('src/img/*.{png,jpg,svg,webp}')
    .pipe(gulp.dest('build/img'))
}

// Copy

const copy = (done) => {
  gulp.src([
    'src/fonts/*.{woff2,woff}',
    'src/*.ico',
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('src/less/**/*.less', gulp.series(styles));
  gulp.watch('src/*.html').on('change', browser.reload);
  gulp.watch('src/js/script.js', gulp.series(scripts));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts
  ),
);

// Start

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts
  ),
  gulp.series(
    server,
    watcher
  ));
