var React = require('react');
var App = require('./components/App.react');
var VizFactory = require('./factories/VizFactory');


var Dispatcher = require('marty').dispatcher.getDefault();

var dispatchToken = Dispatcher.register(function (action) {
  console.log('ACTION: '+ action.type);
});


var HistogramApi = require('./sources/HistogramApi');
var charts = require("react-chartjs");


debugger; 
VizFactory.register('histogram', new VizFactory.VizDef({
    component: charts.Bar,
    api: HistogramApi
}));

VizFactory.register('timeline', new VizFactory.VizDef({
    component: charts.Line,
    api: HistogramApi
}));
    
React.render(
  <App />,
  document.getElementById('app-container')
);