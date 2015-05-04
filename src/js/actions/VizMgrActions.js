
var Marty = require('marty');
var Dispatcher = Marty.dispatcher.getDefault();

var Constants = require('../constants/VizMgrConstants');

var UUID = require('uuid-js');

class VizMgrActionCreators extends Marty.ActionCreators {
    addViz(vizType) {
        this.dispatch(Constants.ADD_VIZ, vizType, UUID.create().toString());
    }
}

module.exports = Marty.register(VizMgrActionCreators);