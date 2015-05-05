var React = require('react');
var App = require('./components/App.react');
var VizFactory = require('./visualizations/VizFactory');

var Dispatcher = require('marty').dispatcher.getDefault();

var dispatchToken = Dispatcher.register(function (action) {
  console.log('ACTION: '+ action.type);
});



VizFactory.register('histogram', require('./visualizations/histogram'));
VizFactory.register('timeline', require('./visualizations/timeline'));
    
React.render(
  <App />,
  document.getElementById('app-container')
);