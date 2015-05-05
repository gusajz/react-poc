var React = require('react');
var Marty = require('marty');
var VizMgrActions = require('../actions/VizMgrActions');
var VizMgrStore = require('../stores/VizMgrStore');
var VizFactory = require('../factories/VizFactory');

// var VisualizationsManagerActions = require('../actions/VisualizationsManagerActions');
// var VisualizationsManager = require('../stores/VisualizationsManager');


class VizContainer extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
        <button onClick={this.handleClose.bind(this)}>Close</button>
      </div>
    );
  }

  handleClose() {
    VizMgrActions.removeViz(this.props.vizId);
  }
}

VizContainer.propTypes = {
  children: React.PropTypes.element.isRequired
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick() {
    var vizType = this.refs.vizType.getDOMNode().value;
    var segmentation = this.refs.segmentation.getDOMNode().value;
    var projection = this.refs.projection.getDOMNode().value;
    VizMgrActions.addViz(vizType, segmentation, projection);
  }

  updateParams() {
    var segmentation = this.refs.segmentation.getDOMNode().value;
    var projection = this.refs.projection.getDOMNode().value;

    this.props.visualizations.map((vizData, vizId) => 
      VizMgrActions.updateParameters(vizId, segmentation, projection)
    );  
  }

  handleSegmentationChange() {
    this.updateParams();
  }

  handleProjectionChange() {
    this.updateParams();    
  }

  render() {
    return (
      <div>
        <select ref="segmentation" defaultValue={"female"} onChange={this.handleSegmentationChange.bind(this)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <select ref="projection" defaultValue={"arpu"} onChange={this.handleProjectionChange.bind(this)}>
          <option value="arpu">Arpu</option>
          <option value="expending">Expending</option>
        </select>
        <select ref="vizType" defaultValue={"histogram"}>
          <option value="histogram">Histogram</option>
          <option value="timeline">Timeline</option>
        </select>
        <button onClick={this.handleClick.bind(this)}>Add viz</button>
        {
          this.props.visualizations.entrySeq().map(viz => 
            <VizContainer key={viz[0]} vizId={viz[0]}>{VizFactory.createComponent(viz[1].type, viz[1].data)}</VizContainer>
          )
        }
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