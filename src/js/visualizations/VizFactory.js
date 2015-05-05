var Immutable = require('immutable');
var React = require('react');

var VizDef = Immutable.Record({component: null, api: null})


class VizFactory {
  constructor() {
    this.charts = Immutable.Map();
    this.VizDef = VizDef;
  }

  register(vizType, vizDef) {
    this.charts = this.charts.set(vizType, vizDef);
  }

  getApi(type) {
    return this.charts.get(type).api;
  }

  createComponent(type, data) {
    return React.createElement(this.charts.get(type).component, { data: data.toJS(), options:{showScale: false} });
  }
}




var vizFactoryInstance = new VizFactory();
module.exports = vizFactoryInstance;