'use strict'

const co = require('co')
const generators = require('yeoman-generator')

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments)
	},

	prompting() {
		return this.prompt([ {

		} ])
	}
})
