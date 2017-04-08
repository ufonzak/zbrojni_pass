import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import store from '../store';
import Question from './Question';
import questions from '../questions';


import {$,jQuery} from 'jquery';
window.$ = $;
window.jQuery = jQuery;

import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const state = store.getState();

    return (
      <div className="container" style={{ paddingTop: '2em' }} >
        <div className="jumbotron">
          <h1>Zbrojní pas</h1>
          <p>Automatic testing page.</p>
        </div>
          {state.questions.length ? <Question/> : <LoadingBanner/>}
      </div>
    );
  }
}

class LoadingBanner extends Component {
  render() {
    return <div className="row">
      <div className="col-md-12">

        <div className="panel panel-default">
          <div className="panel-body">
            Loading questions...
          </div>
        </div>

      </div>
    </div>;
  }
}

export default App;
