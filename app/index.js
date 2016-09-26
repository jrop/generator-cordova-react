'use strict'

const co = require('co')
const generators = require('yeoman-generator')
const globby = require('globby')
const path = require('path')

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments)
	},

	prompting: co.wrap(function * () {
		const { name } = yield this.prompt([ {
			type: 'input',
			name: 'name',
			message: 'Your project name',
			default: this.appname,
		} ])
		this.appname = name
	}),

	default: co.wrap(function * () {
		const globs = [ '**/*.*', '**/.*' ].map(p => this.templatePath(p))
		const files = yield globby(globs)
		files.forEach(f => {
			const relativePath = path.relative(this.sourceRoot(), f)
			this.template(relativePath, relativePath, { appname: this.appname })
		})
	}),

	install() {
		this.npmInstall()
	},
})
