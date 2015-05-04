var React = require('react');
var Marty = require('marty');
var VizMgrActions = require('../actions/VizMgrActions');
var VizMgrStore = require('../stores/VizMgrStore');

// var VisualizationsManagerActions = require('../actions/VisualizationsManagerActions');
// var VisualizationsManager = require('../stores/VisualizationsManager');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vizType: "histogram"
    };
  }

  handleClick() {
    VizMgrActions.addViz(this.state.vizType);
  }

  render() {
    return (
      <div>
        <select value={this.state.vizType}>
          <option value="histogram">Histogram</option>
          <option value="timeline">Timeline</option>
        </select>
        <button onClick={this.handleClick.bind(this)}>Add viz</button>
        {}
      </div>
    );
  }

}

module.exports = Marty.createContainer(App, {
  listenTo: VizMgrStore
});