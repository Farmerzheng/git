
// 引入 gulp
// require  引入模块（类似于ES6中的import……from……）

var gulp = require('gulp');

// 引入包
// js语法检查，检查js语法是否使用了严格模式
var jshint = require('gulp-jshint');
// less包，将less文件转化成css文件
var less = require('gulp-less');
// 项目的路径包
var concat = require('gulp-concat');
// 项目用到的用于压缩文件的包
var uglify = require('gulp-uglify');
// 重命名包
var rename = require('gulp-rename');


// gulp只有五个方法： task ， run ， watch ， src ，和 dest
// task 这个API用来创建任务，在命令行下可以输入 gulp test 来执行test的任务。 
// run 这个API用来运行任务
// watch这个API用来监听任务。
// src 这个API设置需要处理的文件的路径
// dest 这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本。





//concat 插件通过 pipe() 方法接收经过上一个方法处理之后返回的“流”，并把他们该“流”中的所有 Javascript 文件合并为一个名为 "all.js" 的文件。

//通过 Gulp 的 dest() 方法， "all.js" 被写入到我们指定的目录

// 编译less

// gulp.task("任务名称",回调函数)

gulp.task('less', function() {

    //src() 方法用来指定要处理的 js 文件的位置，它会获取匹配到的所有文件的路径，并将它们转换为可以传递给插件进行处理的“流”。这是 Node.js 的 Streams API 的组成部分，也是 Gulp 能够实现如此简洁的 API 语法的原因。

// *.less  所有的less文件
    gulp.src('src/css/*.less') //该任务针对的文件

    //pipe() 方法获取刚才通过 src() 方法获得并传递过来的“流”，并将其传递给指定的插件。本例中是 uglify 插件。
        .pipe(less()) //该任务调用的模块
        // 设置生成文件的路径
        .pipe(gulp.dest('./dist/css')); 
        //将会在dist/css下生成index.css
});

// 检查脚本
gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并，压缩文件

gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 默认任务
gulp.task('default', function(){
    // run 运行任务
    gulp.run('lint', 'less', 'scripts');

    //watch() 的方法，可以自动检查指定的资源（文件）的变化。这样就可以在文件发生变化时自动执行特定的任务，不必每次修改了文件就要回到命令行手动执行 gulp.
    // 监听JS文件变化
    gulp.watch('src/js/*.js', function(){
        gulp.run('lint', 'less', 'scripts'); 
        //多个任务就直接往后加即可
    });
     // 监听less文件变化
    gulp.watch('src/css/*.less', function(){
        gulp.run('lint', 'less', 'scripts');
    });
});
