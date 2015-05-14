var React = require('react');
var Marty = require('marty');
var Immutable = require('immutable');
var Constants = require('../constants/VizMgrConstants');
var _ = require('underscore');

var FilterData = Immutable.Record({id: null, condition: null, operator: null, value: null});

var availableFilters = [{
    'arpu': {
      payload: 'arpu',
      text: 'Arpu',
      operators: [{
        payload: '=',
        text: 'Equals (=)'
      },{
        payload: '>',
        text: 'Mayor than (>)'
      },{
        payload: '<',
        text: 'Minor than (<)'
      }],
      values: [{
        payload: '1',
        text: '1'
      },{
        payload: '2',
        text: '2'
      },{
        payload: '3',
        text: '3'
      }]
    }
  }, {
    'age': {
      payload: 'age',
      text: 'Age',
      operators: [{
        payload: '<>',
        text: 'Distinct (<>)'
      },{
        payload: '=',
        text: 'Equals (=)'
      }],
      values: [{
        payload: '1',
        text: '0-24'
      },{
        payload: '2',
        text: '25-34'
      },{
        payload: '3',
        text: '35-49'
      },{
        payload: '4',
        text: '+50'
      }]
    }
  }, {
    'gender': {
      payload: 'gender',
      text: 'Gender',
      operators: [{
        payload: '=',
        text: 'Equals (=)'
      }],
      values: [{
        payload: 'male',
        text: 'Male'
      },{
        payload: 'female',
        text: 'Female'
      }]
    }
  }
];

class FilterSegmentStore extends Marty.Store {
  constructor(options) {
    super(options);
    
    this.filters = Immutable.Map({});
  
    this.availableFilters = availableFilters;    

  }

  addFilter(filterId, condition, operator, value) {
    this.filters = this.filters.set(filterId, new FilterData({
      id: filterId,
      condition: condition,
      operator: operator,
      value: value
    }));
    console.log('ADD_FILTER: ', condition + ' ' + operator + ' ' + value);
    this.hasChanged();
  }

  removeFilter(filterId) {
    this.filters = this.filters.delete(filterId);
    console.log('REMOVE_FILTER: ' + filterId);
    this.hasChanged();
  }

  getFilters() {
    return this.filters;
  }

  getAvailableFilters() {
    return this.availableFilters;
  }

  getProjectionFilterFields() {
    var result = [];
    var self = this;
    _.map(this.availableFilters, function(val){
      _.map(val, function(obj, key){
        result.push({payload: obj.payload, text: obj.text});
      });
    });
    return result;
  }

  getConditionFilterFields(condition) {
    var result = [];
    var self = this;
    _.map(this.availableFilters, function(val){
      if(val[condition]) {
        result = val[condition].operators;
      }
    });    
    return result;
  }

  getValueFilterFields(condition) {
    var result = [];
    var self = this;

    _.map(this.availableFilters, function(val){
      if(val[condition]) {
        result = val[condition].values;
      }
    });     
    return result;
  }

  getFirstAvailableFilters() {
    var result;
    _.map(this.availableFilters[0], function(val, key){
      result = val;
    });
    return result;
  }

}

var FilterSegmentStoreObject = Marty.register(FilterSegmentStore);
module.exports = FilterSegmentStoreObject;