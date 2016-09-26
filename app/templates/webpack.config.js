'use strict'

const glob = require('globby').sync
const path = require('path')
const webpack = require('webpack')

const entry = { }
glob([ 'src/public/js/**/*.js', '!**/lib/**/*.js' ])
.forEach(f => entry[path.relative('src/public/js', f)] = path.resolve(process.cwd(), f))

const PROD = process.env.NODE_ENV == 'production'
module.exports = {
	devtool: PROD ? '' : '#inline-source-map',
	entry,
	output: {
		path: `${__dirname}/cordova/www/js`,
		filename: '[name]',
	},
	module: {
		loaders: [ {
			loader: 'babel',
			test: /\.js$/,
			exclude: /node_modules/,
		} ],
	},
	plugins: PROD ? [ new webpack.optimize.UglifyJsPlugin({
		comments: false,
		compress: { warnings: false },
		minimize: true,
	}) ] : [ ],
}
