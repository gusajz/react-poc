var VizFactory = require('../VizFactory');

var charts = require("react-chartjs");
var api = require('./api');

var HisotogramChart = require('./component');

module.exports = new VizFactory.VizDef({
    component: HisotogramChart,
    api: api
})