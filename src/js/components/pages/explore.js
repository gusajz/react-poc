var React = require('react');
var mui = require('material-ui');
var AppReact = require('../App.react');
var FiltersReact = require('../Filters.react');
var Paper = mui.Paper;

class Explore extends React.Component {

  render() {

    return (
      <div className="get-started-page app-content-canvas">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h1>Explore</h1>
              <AppReact>
                <h2>Filters</h2>
                <FiltersReact />
              </AppReact>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = Explore;