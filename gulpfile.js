var gulp = require('gulp'); //本地安装gulp所用到的地方
var less = require('gulp-less');
var prefix=require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload=browserSync.reload;

gulp.task('browserSync',['less'],function() {
    browserSync.init({
        server:'dist'
    });
    gulp.watch("src/less/*.less", ['less']);
    gulp.watch("dist/*.html").on('change', reload);
    gulp.watch("dist/js/*.js").on('change', reload);
});


/*gulp.task('watch',function () {
    var watcher = gulp.watch(['src/!**!/!*',], ['less']);
    gulp.watch("dist/css/!*.css",reload({stream: true}));
    gulp.watch("dist/!*.html").on('change', function () {
        reload();
    });
    gulp.watch("dist/js/!*.js").on('change', function(){
        reload({stream: true});
    });
})*/

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

//定义一个testLess任务（自定义任务名称）
gulp.task('less', function () {
    return gulp.src(['src/less/**/*.less','!src/less/reuseClass.less']) //该任务针对的文件
        .pipe(less()).on('error', handleError)
        .pipe(prefix()).on('error', handleError)
        .pipe(gulp.dest('dist/css/'))
        .pipe(reload({stream: true}));
    console.log('less编译',new Date().getTime());
});

/*gulp.task('reloadPage', function () {
    reload();
});*/

//gulp.task('default', ['less_css']);

/*gulp.task('imagemin', function(){
    return gulp.src('src/images/!*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});*/

//gulp.task('default', ['concat_js','less_css','file_include']);

 /*gulp.task('styleInject',['less_css'],function () {
    gulp.src(['src/htmlTemplate/404.html'])
        .pipe(styleInject())
        .pipe(gulp.dest("build/"));
});*/

/*gulp.task('watch', function () {
    var watcher = gulp.watch(['src/!**!/!*',], ['less']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});*/
