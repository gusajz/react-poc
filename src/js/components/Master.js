var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require('./LeftNav');
var mui = require('material-ui');

var { AppBar, AppCanvas, Menu, IconButton } = mui;

class Master extends React.Component {

  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  render() {
    var title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('customization') ? 'Customization' :
      this.context.router.isActive('components') ? 'Components' : '';

    var githubButton = (
      <IconButton
        iconStyle={{color: '#FFF', fill: '#FFF'}}
        iconClassName="muidocs-icon-custom-github"
        onClick={this._onLeftIconButtonTouchTap.bind(this)}
        linkButton={true} />
    );

    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar
          className="mui-dark-theme"
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title='SUN'
          zDepth={0}
          iconElementRight={githubButton}/>

        <AppLeftNav ref="leftNav" iconClassNameRight="muidocs-icon-navigation-expand-more"/>

        <RouteHandler />

        <div className="footer full-width-section mui-dark-theme">
          <p>
            Hand crafted with love by the engineers at <a href="http://call-em-all.com">Call-Em-All</a> and our
            awesome <a href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          {githubButton}
        </div>

      </AppCanvas>
    );
  }

  _onLeftIconButtonTouchTap() {
    console.log('click');
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};


module.exports = Master;