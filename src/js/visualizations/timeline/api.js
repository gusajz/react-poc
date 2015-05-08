var Promise = require('bluebird');
var rn = require('random-number');
var _ = require('underscore');
var Immutable = require('immutable');

class HistogramApi  {
  getData(segmentation, projection) {
    var rndOptions = {
      min:  0, 
      max:  100, 
      integer: true
    }

    var data = {
      'female': {
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
      },
      'male': {
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
                data: [1, 2, 3, 4, 5, 6, 7]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [10, 9, 8, 7, 6, 5, 4]
            }
        ]
      }
    };
    
    var resolvedData = this.getSegmentationData(data, segmentation);

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (Math.random() < 1) {
          resolve(resolvedData);
        } else {
          reject(new Error("Error!!!"));
        }
      }, 500);  
    })
  }
  
  getSegmentationData(data, segmentation){
    if(typeof segmentation === 'string') {
      if(_.has(data, segmentation)){
        return data[segmentation];
      }
    }
    if(typeof segmentation === 'object') {
      var result;
      
      segmentation.map(segment => {
        if(_.has(data, segment.value)) {
          result = data[segment.value];
        }
      });

      result = result || data.male;
      return result;
    }

    return data.male;

  }

}

module.exports = new HistogramApi();