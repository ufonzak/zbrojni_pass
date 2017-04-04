import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import questions from '../questions';
import store from '../store';
import Question from './Question';

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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Question/>
        <hr/>
        <div>
        {state.questions.map(question =>
          <div key={question.index}>{question.question}</div>
        )}
        </div>
      </div>
    );
  }
}

export default App;
