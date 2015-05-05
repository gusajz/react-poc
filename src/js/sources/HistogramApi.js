var Promise = require('bluebird');
var rn = require('random-number');

class HistogramApi  {
  getData(segmentation, projection) {
    var rndOptions = {
      min:  0, 
      max:  100, 
      integer: true
    }

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
              data: [rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions)]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions), rn(rndOptions)]
          }
      ]
    };

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (Math.random() < 0.9) {
          resolve(data);
        } else {
          reject(new Error("Error!!!"));
        }
      }, 500);  
    })
  }
  
}

module.exports = new HistogramApi();