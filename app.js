var html = require('framework/html');
var EventBus = require('framework/events');
var stateMap = require('framework/state');
var {component, render} = require('framework/view');
var network = require('./network');

var bus = new EventBus();
var [on, emit] = [bus.on.bind(bus), bus.emit.bind(bus)]

var state = stateMap({
	title: `network discovery`,
}, (...args) => bus.emit(...args));

function $ui(data) {
	return html`
	<div class="main">
		<h1>${data.title}</h1>
		${data.where && html`
			<h2>Discoverable as <code>${data.where}</code></h2>
		`}
	</div>`;
}


var rootEl = document.querySelector('.app');

// Re-render app on state change
on('change', state => render(rootEl, $ui, state));

// Start the app
emit('change', state);

var name = 'asd';
var network = require('./network');
network({
	name: name,
	port: 2017,
}).then(where => {
	state.where = where;
});
