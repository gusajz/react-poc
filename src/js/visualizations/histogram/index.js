var VizFactory = require('../VizFactory');

var charts = require("react-chartjs");
var api = require('./api');

module.exports = new VizFactory.VizDef({
    component: charts.Bar,
    api: api
})