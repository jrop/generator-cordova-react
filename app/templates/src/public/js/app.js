import React from 'react'
import ReactDOM from 'react-dom'

function load() {
	ReactDOM.render(<div>Hello from React!</div>, document.getElementById('react'))
}

if (typeof window.cordova != 'undefined')
	document.addEventListener('deviceready', load)
else
	window.addEventListener('load', load)
