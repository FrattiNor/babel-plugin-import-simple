const gulp = require('gulp')
const babel = require('gulp-babel')

const scripts = ['src/**/*.js'] // 文件路径

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts() {
    return gulp
        .src(scripts)
        .pipe(babel()) // 使用gulp-babel处理
        .pipe(gulp.dest('lib'))
}

const cjsBuild = gulp.series(compileScripts)

exports.default = cjsBuild
