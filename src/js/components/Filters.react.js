var React = require('react');
var Marty = require('marty');

var FilterSegmentStore = require('../stores/FilterSegmentStore');
var FilterSegmentActions = require('../actions/FilterSegmentActions');

var Immutable = require('immutable');
var FilterInfo = Immutable.Record({field: null, operator: null, value: null});


var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var Paper = mui.Paper;
var FontIcon = mui.FontIcon;
var FlatButton = mui.FlatButton;

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProjection: FilterSegmentStore.getFirstAvailableFilters().payload
    }
  }

  handleAddFilter() {
    var field = React.findDOMNode(this.refs.projection).value;
    var operator = React.findDOMNode(this.refs.conditions).value;
    var value = React.findDOMNode(this.refs.values).value;
    console.log('handleAddFilter =>', field, operator, value);
    //this.props.onAdd(new FilterInfo({ field: field, operator: operator, value: value}));
  }

  handleChangeCondition() {
    var projectionValue = React.findDOMNode(this.refs.projection).value;
    this.setState({'currentProjection': projectionValue});
  }

  getProjectionFilterFields() {
    var projectionOptions = []
    var projections = FilterSegmentStore.getProjectionFilterFields();
    
    for (var projection of projections) {
      if(this.currentProjection === projection.payload) {
        projectionOptions.push(<option key={projection.payload} value={projection.payload} selected>{projection.text}</option>);
      } else {
        projectionOptions.push(<option key={projection.payload} value={projection.payload}>{projection.text}</option>);        
      }
    }
    return projectionOptions;
  }

  getConditionFilterFields() {
    var projectionOptions = []
    var projections = FilterSegmentStore.getConditionFilterFields(this.state.currentProjection);
    for (var projection of projections) {
      projectionOptions.push(<option key={projection.payload} value={projection.payload}>{projection.text}</option>);
    }
    return projectionOptions;
  }

  getValueFilterFields() {
    var projectionOptions = []
    var projections = FilterSegmentStore.getValueFilterFields(this.state.currentProjection);
    for (var projection of projections) {
      projectionOptions.push(<option key={projection.payload} value={projection.payload}>{projection.text}</option>);
    }
    return projectionOptions;
  }

  getProjectionSelectFilterFields() {
    return FilterSegmentStore.getProjectionFilterFields();  
  }

  getConditionSelectFilterFields() {
    return FilterSegmentStore.getConditionFilterFields(this.state.currentProjection); 
  }

  getValueFilterSelectFields() {
    return FilterSegmentStore.getValueFilterFields(this.state.currentProjection);
  }

  handleChangeSelectCondition(event, selectedIndex, item) {
    this.setState({'currentProjection': item.payload});
  }

  handleAddSelectFilter() {
    var field = this.refs.projection.props.menuItems[this.refs.projection.state.selectedIndex].payload;
    var operator = this.refs.conditions.props.menuItems[this.refs.conditions.state.selectedIndex].payload;
    var value = this.refs.values.props.menuItems[this.refs.values.state.selectedIndex].payload;
    this.props.onAdd(new FilterInfo({ field: field, operator: operator, value: value}));
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup key={0} float='left'>
            <form ref='filterForm'>
              <DropDownMenu ref='projection' menuItems={this.getProjectionSelectFilterFields()} onChange={this.handleChangeSelectCondition.bind(this)} />
              <span className="mui-toolbar-separator">&nbsp;</span>
              <DropDownMenu ref='conditions' menuItems={this.getConditionSelectFilterFields()} />
              <span className="mui-toolbar-separator">&nbsp;</span>
              <DropDownMenu ref='values' menuItems={this.getValueFilterSelectFields()} />
            </form>
          </ToolbarGroup>
          <ToolbarGroup key={1} float='right'>
            <RaisedButton label="Add Filter" secondary={true} onClick={this.handleAddSelectFilter.bind(this)}/>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

}

FilterForm.propTypes = {
  onChange: React.PropTypes.func
}

class FilterListRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRemoveFilter(){
    this.props.onRemove(this.props.filterId);
  }

  render() {
    return(
      <div className='col-sm-2'>
        <div className='home-feature'>
          <div className="mui-font-style-title">
            ( {this.props.filter.field} {this.props.filter.operator} {this.props.filter.value} )
            <FlatButton label='remove' primary={true}  onClick={this.handleRemoveFilter.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

class FilterList extends React.Component {
  render() {
    var rows = [];
    this.props.filters.map((filter, idx) =>
      rows.push(<FilterListRow onRemove={this.props.onRemove} filter={filter} key={idx} filterId={idx}/>)
    );
    return(
      <div className='row'>
        {rows}
      </div>
    );
  }
}

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: new Immutable.List(),
      projection: null
    }
  }

  handleAddFilter(newFilter) {
    this.setState({
      filters: this.state.filters.push(newFilter)
    });
  }

  componentDidUpdate(){
    FilterSegmentActions.updateFilters(this.state.filters);
  }


  handleRemoveFilter(idx) {
    this.setState({
      filters: this.state.filters.delete(idx)
    });
    FilterSegmentActions.updateFilters(this.state.filters);
  }

  render() {
    return(
      <div className='row'>
        <div className='col-sm-6'>
          <FilterForm {...this.props} onAdd={this.handleAddFilter.bind(this)} />
        </div>
        <div className='col-sm-12'>
          <br/>
          <FilterList filters={this.state.filters} onRemove={this.handleRemoveFilter.bind(this)}/>
        </div>
      </div>
    );
  }
}

module.exports = FilterContainer;
