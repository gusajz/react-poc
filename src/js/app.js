var React = require('react');
var App = require('./components/App.react');

var Dispatcher = require('marty').dispatcher.getDefault();

var dispatchToken = Dispatcher.register(function (action) {
  console.log('ACTION: '+ action.type);
});

React.render(
  <App />,
  document.getElementById('app-container')
);