import React, { Component } from 'react';
import store from '../store';


<ul class="list-group">
  <li class="list-group-item">
    <span class="badge">14</span>
    Cras justo odio
  </li>
</ul>

class Stats extends Component {
  render() {
    const state = this.props.state;

    if (typeof state.total !== 'number') {
      return null;
    }

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge">{state.good}</span>
          <span className="badge">{state.total ? (state.good / state.total * 100).toFixed() + ' %' : 0}</span>
          Correct
        </li>
        <li className="list-group-item">
          <span className="badge">{state.bad}</span>
          Wrong
        </li>
        <li className="list-group-item">
          <span className="badge">{state.total - (state.bad - state.good)}</span>
          Unanswered
        </li>
        <li className="list-group-item">
          <span className="badge">{state.total}</span>
          Total
        </li>
      </ul>
    );
  }
}

export default Stats;
