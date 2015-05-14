var React = require('react');
var mui = require('material-ui');

class Campaign extends React.Component {

  render() {

    return (
      <div className="get-started-page app-content-canvas">
        <div className="full-width-section">

          <h2 className="mui-font-style-headline">Prerequisites</h2>
          <p>
            We recommend that you get started with the <a href="http://facebook.github.io/react/">React Library</a> before diving into
            material-ui for a better understanding. Should you choose to skip this, don&apos;t worry, we&apos;ll explain relevant React concepts as
            they come along.
          </p>


          <h2 className="mui-font-style-headline">Installation</h2>
          <p>
            Material-UI is available as an <a href="https://www.npmjs.org/package/material-ui">npm package</a>.
            Use <a href="http://browserify.org/">browserify</a> and <a href="https://github.com/andreypopp/reactify">reactify</a> for
            dependency management and JSX transformation. 
          </p>

          <h3 className="mui-font-style-title">React-Tap-Event-Plugin</h3>
          <p>
            Some components use <a href="https://github.com/zilverline/react-tap-event-plugin">react-tap-event-plugin</a> to
            listen for touch events. This dependency is temporary and will go away once react v1.0 is released. Until then, be
            sure to inject this plugin at the start of your app.
          </p>

        </div>
      </div>
    );
  }

}

module.exports = Campaign;