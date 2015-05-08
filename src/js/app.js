var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./app-routes');

var injectTapEventPlugin = require("react-tap-event-plugin");
//var App = require('./components/App.react');

//var LeftNav = require('./components/LeftNav');

var VizFactory = require('./visualizations/VizFactory');

var Dispatcher = require('marty').dispatcher.getDefault();

var dispatchToken = Dispatcher.register(function (action) {
  console.log('ACTION: '+ action.type, '|| ARGS:', action.arguments);
});

injectTapEventPlugin();

VizFactory.register('histogram', require('./visualizations/histogram'));
VizFactory.register('timeline', require('./visualizations/timeline'));

/*    
React.render(
  <App />,
  document.getElementById('app-container')
);
*/

Router
  .create({
    routes: AppRoutes,
    scrollBehavior: Router.ScrollToTopBehavior
  })
  .run(function (Handler) {
    React.render(<Handler/>, document.body);
  });