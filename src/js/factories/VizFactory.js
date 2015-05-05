var Immutable = require('immutable');
var charts = require("react-chartjs");
var React = require('react');

var VizDef = Immutable.Record({component: null, api: null})

var HistogramApi = require('../sources/HistogramApi');

class VizFactory {
  constructor() {
    this.charts = Immutable.Map({
      'histogram': new VizDef({
        component: charts.Bar,
        api: HistogramApi
      }),
      'timeline': new VizDef({
        component: charts.Line,
        api: HistogramApi
      })
    });
  }

  getApi(type) {
    return this.charts.get(type).api;
  }

  createComponent(type, data) {
    return React.createElement(this.charts.get(type).component, { data: data.toJS(), options:{showScale: false} });
  }
}


module.exports = new VizFactory();