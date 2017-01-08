// Gulp packages
var gulp = require('gulp');
var browserSync = require('browser-sync');
var responsive = require('gulp-responsive');
var runSequence = require('run-sequence');
var del = require('del');

var qual = 80;

// Start browser-sync server

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
})



// Watchers

gulp.task('watch', function(){
	gulp.watch('dist/*.+(html|css)', browserSync.reload);
	gulp.watch('dist/images/*', browserSync.reload);
	gulp.watch('*.html', ['html']);
	gulp.watch('css/*.css', ['css']);
});

// Optimization/building tasks

// ------------------

// Images

gulp.task('images', function(){
	return gulp.src('images-src/*') // Images getter
		.pipe(responsive({ // Task running
			'*cover.+(png|jpg)': [{
				width: 900,
				quality: qual,
				rename: ({
					suffix: "-1x"
				})
			},{
				width: 1350,
				quality: qual,
				rename: ({
					suffix: "-1.5x"
				})
			}],
			'*cover-closeup.+(png|jpg)':[{
				width: 600,
				quality: qual,
				rename:({
					suffix: "-1x"
				})
			},{
				width: 900,
				quality: qual,
				rename:({
					suffix: "-1.5x"
				})
			}],
			'logo*': [{
				width:200,
				quality: qual,
				rename:({
					suffix: "-200w"
				})},{
				width:100,
				quality: qual,
				rename:({
					suffix: "-100w"
				})
			}],
			'!*+(cover|logo)*': [{ // For secou
				width:400, 
				quality : qual,
				rename:({
					suffix: "-1x"
				})},{
				width: 750,
				quality: qual,
				rename:({
					suffix:"-2x"
				})
			}]
		}))
		.pipe(gulp.dest('dist/images')); // Set destination for optimized images
}); 

// Markup

gulp.task('html', function(){ // Move or minify html to dist
	return gulp.src('*.html')
	// Do some operation here, otherwise just move the file
		.pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){ // Move or minify css to dist
	return gulp.src('css/*.css')
	// Do some operation here, otherwise just move the file
		.pipe(gulp.dest('dist/css/'));
});

// Cleaning tasks

gulp.task('clean:dist', function(){
	return del.sync('dist');
});



// Build sequences --------------------------------------------

gulp.task('build', function(callback){
	runSequence('clean:dist', ['html', 'css', 'images'], callback);
});

gulp.task('default', function(callback){
	runSequence('browserSync', 'watch', callback);
});
