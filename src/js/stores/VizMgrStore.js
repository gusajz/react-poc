// var mcFly = require('../flux/mcFly');

// var handler = function(payload){

//   switch(payload.actionType) {
//     case 'ADD_VISUALIZATION':
//       console.log('ADD');
//     break;
//     default:
//       return true;
//   }

//   VisualizationsManager.emitChange();

//   return true;

// }
// var VisualizationsManager = mcFly.createStore({

//   getCount: function() {
//     return _count;
//   }

// }, handler);

// module.exports = VisualizationsManager;

var Marty = require('marty');
var Immutable = require('immutable');

var Constants = require('../constants/VizMgrConstants');

var VizData = Immutable.Record({id: null, type: null, data: null, segmentation: null, projection: null});


class VizMgrStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.visualizations = Immutable.Map({});
    this.handlers = {
      removeViz: Constants.REMOVE_VIZ,
      updateViz: Constants.UPDATE_VIZ
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

  // addViz(vizType, vizId) {
  //   this.visualizations = this.visualizations.set(vizId, new VizData({ id: vizId, type: vizType }));
  //   console.log('ADD_VIZ: ' + vizType);
  //   this.hasChanged();
  // }

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

// var usersStore = Marty.register(UsersStore);

// var listener = usersStore.addChangeListener(function () {
//   console.log('Users store changed');
//   listener.dispose();
// });
// 
// 