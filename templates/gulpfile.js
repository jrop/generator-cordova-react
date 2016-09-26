// npm i --save-dev gulp gulp-autoprefixer gulp-babel del gulp-less lodash.once webpack
'use strict'

const gulp = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const del = require('del')
const less = require('gulp-less')
const once = require('lodash.once')
const webpack = require('webpack')

const WATCHING = process.argv.includes('watch')

function err(e) {
	const msg = e.codeFrame ? e.codeFrame : e.message
	console.error(msg)
	if (WATCHING) {
		process.exitCode = 1
		this.emit('end')
	} else {
		throw e
	}
}

gulp.task('default', [ 'css', 'js:client', 'js:server' ])

gulp.task('css', () => gulp.src([ 'src/public/css/**/*.less', '!**/lib/**/*.*' ])
	.pipe(autoprefixer()).on('error', err)
	.pipe(less()).on('error', err)
	.pipe(gulp.dest('cordova/www/css')))

const compiler = webpack(require('./webpack.config.js'))
const build = WATCHING ? once(compiler.watch.bind(compiler, { })) : compiler.run.bind(compiler)
let run = false
gulp.task('js:client', done => build(function (err, stats) {
	if (err) return done(err)
	console.log(stats.toString({ colors: true, chunks: false, timings: false, version: false }))
	if (!run) {
		done()
		run = true
	}
}))

gulp.task('js:server', () => gulp.src('src/main/**/*.js')
	.pipe(babel()).on('error', err)
	.pipe(gulp.dest('build')))

gulp.task('watch', [ 'default' ], function () {
	gulp.watch('src/public/css/**/*.less', [ 'css' ])
	gulp.watch('src/public/js/**/*.js', [ 'js:client' ])
	gulp.watch('src/main/**/*.js', [ 'js:server' ])
})

gulp.task('clean', () => Promise.all([
	del('cordova/www/css'),
	del('cordova/www/js'),
	del('build'),
]))
