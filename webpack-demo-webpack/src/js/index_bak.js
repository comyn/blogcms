import _ from 'lodash'
import '../css/style.css'
import Icon from '../images/logo.jpg'
import Data from '../data/data.xml'
import printMe from './print.js'
import { cube } from './math'

function component() {
	var element = document.createElement('div')
	var element1 = document.createElement('pre')
	var btn = document.createElement('button')

	// Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
	element.innerHTML = _.join(['Hello', 'webpack webpack webpack webpack'], ' ')
	element1.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5)].join('\n\n')
	element.classList.add('hello')

	btn.innerHTML = 'Click me and check the console!'
	btn.onclick = printMe

	element.appendChild(btn)

	var myIcon = new Image()
	myIcon.src = Icon

	element.appendChild(myIcon)

	console.log(Data)

	return element
}

document.body.appendChild(component())

if (module.hot) {
	module.hot.accept('./print.js', function () {
		console.log('Accepting the updated printMe module!')
		printMe()
	})
}
