import React from 'react';

export default React.createClass({
  propTypes: {
    histogram: React.PropTypes.array
  },

  render() {
    return <div className="Histogram">
      Histogram
      {[...Array(10)].map((x, i) =>
        <div>{ this.props.histogram ? this.props.histogram[i] : '-' }</div>
      )}
    </div>
  }
});
