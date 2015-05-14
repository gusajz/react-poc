var Marty = require('marty');
var Dispatcher = Marty.dispatcher.getDefault();
var Constants = require('../constants/VizMgrConstants');
var UUID = require('uuid-js');

var VizMgrStore = require('../stores/VizMgrStore');
var VizMgrAction = require('./VizMgrActions');

class FilterSegmentActionCreators extends Marty.ActionCreators {
    updateFilters(filters) {
      VizMgrStore.visualizations.map(viz => {
        VizMgrAction.updateParameters(viz.id, filters, viz.projection)
      });
    }
}

module.exports = Marty.register(FilterSegmentActionCreators);