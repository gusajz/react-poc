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


class VizMgrStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.visualizations = Immutable.Map({});
    this.handlers = {
      addViz: Constants.ADD_VIZ
    };
  }
  addViz(vizType, vizId) {
    this.visualizations = this.visualizations.set(vizId, { type: vizType });
    console.log('ADD_VIZ: ' + vizType);
    this.hasChanged();
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