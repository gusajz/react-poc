var Marty = require('marty');
var Dispatcher = Marty.dispatcher.getDefault();
var Constants = require('../constants/VizMgrConstants');
var UUID = require('uuid-js');
var VizMgrStore = require('../stores/VizMgrStore');
var VizFactory = require('../visualizations/VizFactory');

class VizMgrActionCreators extends Marty.ActionCreators {
  getData(vizType, segmentation, projection) {
    return VizFactory
      .getApi(vizType)
      .getData(segmentation, projection)
  }

  addViz(vizType, segmentation, projection) {
    this.getData(vizType, segmentation, projection)
      .then(data => {
        this.dispatch(
          Constants.UPDATE_VIZ,
          UUID.create().toString(),
          vizType,
          segmentation,
          projection,
          data
      )
    });
  }

  removeViz(vizId) {
      this.dispatch(Constants.REMOVE_VIZ, vizId);
  }

  updateParameters(vizId, segmentation, projection) {
    var viz = VizMgrStore.getVisualizations().get(vizId)
    this.getData(viz.type, segmentation, projection)
      .then(data => {
        this.dispatch(
          Constants.UPDATE_VIZ,
          vizId,
          viz.type,
          segmentation,
          projection,
          data
        )
    });
  }
}

module.exports = Marty.register(VizMgrActionCreators);