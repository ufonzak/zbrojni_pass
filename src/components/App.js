import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import questions from '../questions';
import store from '../store';
import Question from './Question';
import Stats from './Stats';

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

        {state.questions.length ? <Question/> : <p>Loading questions...</p>}

        <hr/>

        <Stats/>
        <hr/>
      </div>
    );
  }
}

export default App;
