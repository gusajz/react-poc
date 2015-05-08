var React = require('react');
var Marty = require('marty');
var VizMgrActions = require('../actions/VizMgrActions');
var VizMgrStore = require('../stores/VizMgrStore');
var VizFactory = require('../visualizations/VizFactory');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var FloatingActionButton = mui.FloatingActionButton;
var DropDownMenu = mui.DropDownMenu;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var Paper = mui.Paper;

var segmentationOptions = [{
  payload: 'female',
  text: 'Female'
}, {
  payload: 'male',
  text: 'Male'
}];

var proyectionOptions = [{
  payload: 'arpu',
  text: 'Arpu',
}, {
  payload: 'age',
  text: 'Age'
},
{
  payload: 'extending',
  text: 'Extending'
}];

class VizContainer extends React.Component {

  updateParams(segmentation, projection) {
    VizMgrActions.updateParameters(this.props.vizId, segmentation, projection)
  }

  handleSegmentationChangev2(e, selectedIndex, menuItem) {
    this.updateParams(
      menuItem.payload,
      React.findDOMNode(this.refs.projection).value
    )
  }

  handleProjectionChangev2(e, selectedIndex, menuItem) {
    this.updateParams(
      React.findDOMNode(this.refs.segmentation).value,
      menuItem.payload
    )
  }

  handleFilterChange(e) {
    var segment = React.findDOMNode(this.refs.segmentation).value;
    var projection = React.findDOMNode(this.refs.projection).value;
    console.log(segment, projection);
    /*
    this.updateParams(
      React.findDOMNode(this.refs.segmentation).value,
      React.findDOMNode(this.refs.projection).value
    )
    */
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <h3 className='mui-font-style-display-1'
            style={{marginLeft: '10px'}}>
              Arpu
            </h3>
          </div>
          <div className='col-xs-12'>
            {this.props.children}
          </div>
          <div className='col-xs-2 last-xs' style={{padding: '10px'}}>
            <RaisedButton label="Close" onClick={this.handleClose.bind(this)}/>
          </div>
        </div>
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

var vizTypeOptions = [{
  payload: 'histogram',
  text: 'Histogram'
},{
  payload: 'timeline',
  text: 'Timeline'
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick() {
    var vizType = vizTypeOptions[this.refs.vizType.state.selectedIndex].payload;
    VizMgrActions.addViz(vizType, "female", "arpu");
  }

  render() {
    return (
      <div className='box'>
        <Toolbar>
          <ToolbarGroup key={0} float='left'>
            <DropDownMenu ref="vizType" menuItems={vizTypeOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float='right'>
            <RaisedButton primary={true} label="Add Viz" onClick={this.handleClick.bind(this)} />
          </ToolbarGroup>
        </Toolbar>
        {this.props.children}
        <br/>
        <div className='row'>
          {
            this.props.visualizations.entrySeq().map(viz =>
              <div className='col-xs-3' style={{paddingBottom: '10px', paddingTop: '10px'}}> 
                <Paper zDepth={1}>
                  <VizContainer key={viz[0]} vizId={viz[0]}>
                    {VizFactory.createComponent(viz[1].type, viz[1].data)}
                  </VizContainer>
                </Paper>
              </div>
            )
          }
        </div>
      </div>
    );
  }

}

App.propTypes = {
  children: React.PropTypes.element.isRequired
}


module.exports = Marty.createContainer(App, {
  listenTo: VizMgrStore,
  fetch: {
    visualizations() {
      return VizMgrStore.getVisualizations();
    },
  }
});
