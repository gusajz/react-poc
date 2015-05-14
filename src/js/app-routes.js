var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
var Master = require('./components/Master');
var Home = require('./components/pages/home');
var Explore = require('./components/pages/explore');
var Segment = require('./components/pages/segment');
var Campaign = require('./components/pages/campaign');

var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="explore" handler={Explore} />
    <Route name="segment" handler={Segment} />
    <Route name="campaign" handler={Campaign} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;