var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
//var ThemeManager = new mui.Styles.ThemeManager().getCurrentTheme();

class HomePage extends React.Component {

  constructor() {
    super();
    this._onExploreClick = this._onExploreClick.bind(this);
    this._onCampaignClick = this._onCampaignClick.bind(this);
  }

  _raisedButton() {
    return {
      label: {
        color: 'red',
      }
    }
  }

  render() {

    return (
      <div className="app-content-canvas">
        <div className="home-page-hero full-width-section">
          <div className="home-page-hero-content">
            <div className="tagline">
              <h1 className="brand-name">material ui</h1>
              <h2 className="mui-font-style-headline">
                A Set of React Components <span className="no-wrap">
                that Implement</span> <span className="no-wrap">
                Google&apos;s Material Design</span>
              </h2>
              <RaisedButton 
                className="demo-button" 
                label="Explore" 
                onTouchTap={this._onExploreClick}
                linkButton={true} 
                labelStyle={this._raisedButton().label}/>
              <RaisedButton 
                className="github-button" 
                label="Campaign" 
                linkButton={true} 
                onTouchTap={this._onCampaignClick}
                labelStyle={this._raisedButton().label}/>
            </div>
          </div>
        </div>

        <div className="full-width-section home-purpose">
          <p className="full-width-section-content">
            Material-UI came about from our love of&nbsp;
            <a href="http://facebook.github.io/react/">React</a> and&nbsp;
            <a href="https://www.google.com/design/spec/material-design/introduction.html">
              Google's Material Design
            </a>. We're currently using it on a project at&nbsp;
            <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it 
            and making it better in the coming months.
          </p>
        </div>

        <div className="full-width-section home-features">

          <div className="feature-container full-width-section-content">
          </div>

        </div>

        <div className="full-width-section home-contribute">
          <div className="full-width-section-content">
            <h3>
              Want to help make this <span className="no-wrap">project awesome?</span> <span className="no-wrap">Check out our repo.</span>
            </h3>
            <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/callemall/material-ui" />
          </div>
        </div>

      </div>
    );
  }

  _onExploreClick() {
    this.context.router.transitionTo('explore');
  }

  _onCampaignClick() {
    this.context.router.transitionTo('campaign');
  }
}

HomePage.contextTypes = {
  router: React.PropTypes.func
};

module.exports = HomePage;