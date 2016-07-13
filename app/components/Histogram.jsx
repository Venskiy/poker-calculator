import React from 'react';

export default React.createClass({
  propTypes: {
    playerName: React.PropTypes.string.isRequired,
    histogram: React.PropTypes.array
  },

  render() {
    return <div className="Histogram">
      <div>{this.props.playerName}</div>
      {[...Array(10)].map((x, i) =>
        <div>{ this.props.histogram ? this.props.histogram[i] : '-' }</div>
      )}
    </div>
  }
});
