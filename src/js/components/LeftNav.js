var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  { MenuItem, LeftNav } = mui,

  menuItems = [
    { route: 'home', text: 'Home' },
    { route: 'explore', text: 'Explore' },
    { route: 'campaign', text: 'Campaigns' }
  ];

class AppLeftNav extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
    console.log(this);
  }

  render() {
    var header = <div className="logo" onClick={this._onHeaderClick}>SUN Mock</div>;

    return (
      <LeftNav 
        ref="leftNav"
        docked={false}
        isInitiallyOpen={true}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  }

  toggle() {
    console.log('toggle');
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  }

}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppLeftNav;