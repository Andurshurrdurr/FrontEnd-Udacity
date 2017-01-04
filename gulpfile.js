// Gulp packages
var gulp = require('gulp');
var browserSync = require('browser-sync');
var responsive = require('gulp-responsive');
var runSequence = require('run-sequence');
var del = require('del');

// console task for syntax reference
gulp.task('hello', function() {
	console.log('Hello World, type y');
})

// Start browser-sync server

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})



// Watchers

gulp.task('watch', function(){
	gulp.watch('dist/*.+(html|css)', browserSync.reload);
	gulp.watch('dist/images/*', browserSync.reload);
	gulp.watch('*.html', ['html'])
	gulp.watch('css/*.css', ['css'])
})

// Optimization/building tasks

// ------------------

// Images

gulp.task('images', function(){
	return gulp.src('images-src/*') // Images getter
		.pipe(responsive({ // Task running
			'*cover*': [{
				width: 2048px,
				quality: 50
				rename:(suffi) // To be continued
				//quality: 30 //
			}] // Add more filetypes or properties after this here
		}))
		.pipe(gulp.dest('dist/images')); // Set destination for optimized images
}); 

// Markup

gulp.task('html', function(){ // Move or minify html to dist
	return gulp.src('*.html')
	// Do some operation here, otherwise just move the file
		.pipe(gulp.dest('dist/'));
})

gulp.task('css', function(){ // Move or minify css to dist
	return gulp.src('css/*.css')
	// Do some operation here, otherwise just move the file
		.pipe(gulp.dest('dist/css/'));
})

// Cleaning tasks

gulp.task('clean:dist', function(){
	return del.sync('dist');
});



// Build sequences --------------------------------------------

gulp.task('build', function(callback){
	runSequence('clean:dist', ['html', 'css', 'images'], callback)
})

gulp.task('default', function(callback){
	runSequence('browserSync', 'watch', callback)
})
