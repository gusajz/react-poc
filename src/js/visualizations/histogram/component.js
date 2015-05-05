var React = require('react');

var charts = require("react-chartjs");
var assign = require('lodash.assign');


class HistogramChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: null
        };
    }

    getMousePosition(e) {
        var parent = React.findDOMNode(this)

        return {
            x: e.clientX - parent.offsetLeft,
            y: e.clientY - parent.offsetTop
        }
    }

    handleMouseUp(e) {
        var selection = assign(this.state.selection, {dragging: null});
        this.setState({selection: selection});

        // var selectedBars = [];
        // this.refs.chart.getChart().eachBars(function(bar) {
        //     if (bar.x <= this.state.selection.)
        // });
        e.preventDefault();
    }

    handleMouseDown(e) {
        var mouse = this.getMousePosition(e);
        this.setState({
            selection: {
                top: mouse.y,
                bottom: mouse.y, 
                left: mouse.x,
                right: mouse.x,
                dragging: {
                    initialX: mouse.x,
                    initialY: mouse.y
                }
            }
        });
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (this.state.selection && this.state.selection.dragging !== null) {
            var mouse = this.getMousePosition(e);

            var top = Math.min(this.state.selection.dragging.initialY, mouse.y);
            var left = Math.min(this.state.selection.dragging.initialX, mouse.x);

            var right = Math.max(this.state.selection.dragging.initialX, mouse.x);
            var bottom = Math.max(this.state.selection.dragging.initialY, mouse.y);
            
            this.setState({
                selection: {
                    top: top,
                    left: left,
                    right: right,
                    bottom: bottom,
                    dragging: this.state.selection.dragging
                }
            });
        }
        e.preventDefault();
    }
        

    render() {
        if (null !== this.state.selection) {
            var selectionDivStyle = {
                height: (this.state.selection.bottom - this.state.selection.top) + 'px',
                width: (this.state.selection.right - this.state.selection.left) + 'px',
                backgroundColor: 'rgba(210, 210, 210, 0.46)', 
                position: 'absolute',
                left: this.state.selection.left + 'px',
                top: this.state.selection.top + 'px'
            };
        } else {
            var selectionDivStyle = {
                display: 'none'
            }
        }

        var containerStyle = {
            position: 'relative'
        }

        return <div style={containerStyle} onMouseDown={this.handleMouseDown.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}>
            <div style={selectionDivStyle}/>
            <charts.Bar ref="chart" {...this.props}/>
        </div>
    }
}

module.exports = HistogramChart;
