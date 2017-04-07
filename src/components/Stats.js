import React, { Component } from 'react';
import store from '../store';

class Stats extends Component {
  render() {
    const state = this.props.state;

    if (typeof state.total !== 'number') {
      return null;
    }

    return (
      <div>
        {state.good}/{state.bad}/{state.total}
      </div>
    );
  }
}

export default Stats;
