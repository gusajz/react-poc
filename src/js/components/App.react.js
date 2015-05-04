var React = require('react');
var Marty = require('marty');
var VizMgrActions = require('../actions/VizMgrActions');
var VizMgrStore = require('../stores/VizMgrStore');

var charts = require("react-chartjs");
var Immutable = require('immutable');

// var VisualizationsManagerActions = require('../actions/VisualizationsManagerActions');
// var VisualizationsManager = require('../stores/VisualizationsManager');

class VizFactory {
  constructor() {
    this.charts = Immutable.Map({
      'histogram': charts.Line,
      'timeline': charts.Bar
    });
  }

  create(type, id) {
    var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
    };
    return React.createElement(this.charts.get(type), { key: id, data: data, options:{showScale: false} });
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.vizFactory = new VizFactory();
    this.state = {
    };
  }

  handleClick() {
    var vizType = this.refs.vizType.getDOMNode().value;
    VizMgrActions.addViz(vizType);
  }

  render() {
    return (
      <div>
        <select ref="vizType" defaultValue={"histogram"}>
          <option value="histogram">Histogram</option>
          <option value="timeline">Timeline</option>
        </select>
        <button onClick={this.handleClick.bind(this)}>Add viz</button>
        {this.props.visualizations.entrySeq().map(viz => this.vizFactory.create(viz[1].type, viz[0]))}
      </div>
    );
  }

}

module.exports = Marty.createContainer(App, {
  listenTo: VizMgrStore,
  fetch: {
    visualizations() {
      return VizMgrStore.getVisualizations();
    }
  },
});