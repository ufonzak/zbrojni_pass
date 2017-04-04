import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import store from '../store';

class Question extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    clearTimeout(this.nextQuestionTimer);
    this.unsubscribe();
  }

  render() {
    const state = store.getState();
    const question = state.question;

    if (state.questions.length === 0) {
      return <button onClick={this.onStart.bind(this)}>Start</button>;
      return null;
    }

    let index = question.index;
    if (index === null) {
      return <button onClick={this.onStart.bind(this)}>Start</button>
    }

    let questionObject = state.questions[index];
    let hasAnswered = typeof question.answerIndex === 'number';
    let hasAnsweredCorrectly = questionObject.answerIndex === question.answerIndex;

    return (
      <div>
        <p>{questionObject.question}</p>
        <div>
          {questionObject.options.map((option, index) => {
            let color = null;
            if (hasAnswered) {
              if (index === question.answerIndex) {
                color = hasAnsweredCorrectly ? 'green' : 'red';
              }
              else if (index === questionObject.answerIndex) {
                color = 'yellow';
              }
            }

            return <p key={index}
              style={{
                  backgroundColor: color
                }}
              onClick={this.onQuestionClick.bind(this, index)}>
              {option}
            </p>;
          })}
        </div>
      </div>
    );
  }

  onQuestionClick(index) {
    console.log(`Option clicked ${index}`);
    if (this.nextQuestionTimer) {
      return;
    }

    store.dispatch({ type: 'QUESTION_ANSWER', answerIndex: index });

    this.nextQuestionTimer = setTimeout(() => {
      this.nextQuestionTimer = null;
      store.dispatch({ type: 'QUESTION_NEXT' });
    }, 1000);
  }

  onStart() {
    store.dispatch({ type: 'QUESTION_START' });
  }
}

export default Question;
