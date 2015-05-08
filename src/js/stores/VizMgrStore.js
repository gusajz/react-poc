var Marty = require('marty');
var Immutable = require('immutable');
var Constants = require('../constants/VizMgrConstants');
var VizData = Immutable.Record({id: null, type: null, data: null, segmentation: null, projection: null, filters: Immutable.List});

class VizMgrStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.visualizations = Immutable.Map({});
    this.handlers = {
      removeViz: Constants.REMOVE_VIZ,
      updateViz: Constants.UPDATE_VIZ,
    };
  }

  updateViz(vizId, vizType, segmentation, projection, data) {

    var newData = this.visualizations
      .get(vizId, new VizData({id: vizId, type: vizType}))
      .merge({segmentation: segmentation, projection: projection, data: data});

    this.visualizations = this.visualizations.set(vizId, newData);
    console.log('UPDATE_VIZ');
    this.hasChanged();
  }

  removeViz(vizId) {
    this.visualizations = this.visualizations.delete(vizId);
    console.log('REMOVE_VIZ: ' + vizId);
    this.hasChanged();
  }

  getVisualizations() {
    return this.visualizations;
  }
}

module.exports = Marty.register(VizMgrStore);