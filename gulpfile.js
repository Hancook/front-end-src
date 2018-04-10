let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let minifyCss = require('gulp-minify-css');
let rev = require('gulp-rev');
let revCollector = require('gulp-rev-collector');

gulp.task('sass',function () {
    gulp.src('./sass/*.scss') 
        .pipe(sass({
		//	outputStyle: 'compressed'
		}))
        .pipe(gulp.dest('../static/style'));
});

gulp.task('babel', function () {
	return gulp.src(['./js/**/*.js', '!./js/**/*.min.js', '!./js/vendors/*.js'])
		.pipe(babel())  
		.pipe(gulp.dest('../static/js'));
});

gulp.task('copy',function(){
    gulp.src('./css/*.css')
		.pipe(gulp.dest('../static/style'));
    gulp.src('./images/*.*')
		.pipe(gulp.dest('../static/images'));
    gulp.src('./js/vendors/*.*')
		.pipe(gulp.dest('../static/js/vendors'));
    gulp.src('./js/**/*.min.js')
		.pipe(gulp.dest('../static/js'));
});


gulp.task('concat-css', function() {
    let list = [
		'./sass/common.scss', 
		'./sass/index.scss', 
		'./sass/school.scss', 
		'./sass/major.scss', 
		'./sass/account.scss', 
		'./sass/news.scss', 
		'./sass/personality.scss', 
		'./sass/my.scss', 
		'./sass/app.scss', 
		'./sass/service.scss',
	];
	gulp.src(list)
		.pipe(sass({}))
		.pipe(concat('style.min.css'))
		.pipe(minifyCss())
		//.pipe(rev())
		.pipe(gulp.dest('../static/style'))
		//.pipe(rev.manifest())
		//.pipe(gulp.dest('./rev'));
});

gulp.task('watch',function(){
    gulp.watch('./sass/*.scss',['concat-css']);
    gulp.watch('./css/*.css',['copy']);
    gulp.watch(['./js/**/*.js'],['babel']);
});

gulp.task('default', ['copy', 'concat-css', 'babel', 'watch'], function(){

});
