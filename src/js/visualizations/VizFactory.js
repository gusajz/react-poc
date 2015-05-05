var Immutable = require('immutable');
var React = require('react');

var VizDef = Immutable.Record({component: null, api: null})

var assign = require('lodash.assign');


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

  createComponent(type, data, opts) {
    var defaultOpts = { 
      data: data.toJS(), 
      options:{showScale: false}
    };

    return React.createElement(this.charts.get(type).component, assign(defaultOpts, opts));
  }
}




var vizFactoryInstance = new VizFactory();
module.exports = vizFactoryInstance;