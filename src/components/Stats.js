import React, { Component } from 'react';
import store from '../store';

class Stats extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const state = store.getState().stats;

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
