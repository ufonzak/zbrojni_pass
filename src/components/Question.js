import React, { Component } from 'react';
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
    const question = store.getState().question;

    let index = question.index;
    if (index === null) {
      return <button onClick={this.onStart.bind(this)}>Start</button>;
    }

    if (index >= question.questions.length) {
      return (
        <div>
          <p>All done</p>
          <button onClick={this.onPrev.bind(this)}>Prev</button>
          <button onClick={this.onStart.bind(this)}>Start</button>
        </div>
      );
    }

    let questionObject = question.questions[index];
    let hasAnswered = typeof questionObject.answeredIndex === 'number';
    let hasAnsweredCorrectly = questionObject.answerIndex === questionObject.answeredIndex;

    return (
      <div>
        <p>Question {question.index + 1} / {question.questions.length}</p>
        <p>{questionObject.question}</p>
        <div>
          {questionObject.options.map((option, index) => {
            let color = null;
            if (hasAnswered) {
              if (index === questionObject.answeredIndex) {
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
              onClick={hasAnswered ? null : this.onQuestionClick.bind(this, index)}>
              {option}
            </p>;
          })}
        </div>
        <div>
          <button onClick={this.onNext.bind(this)}>Next</button>
          <button onClick={this.onPrev.bind(this)}>Prev</button>
        </div>
      </div>
    );
  }

  onQuestionClick(index) {
    console.log(`Option clicked ${index}`);
    store.dispatch({ type: 'QUESTION_ANSWER', answerIndex: index });

    //TODO: does not really work
    this.nextQuestionTimer = setTimeout(() => {
      store.dispatch({ type: 'QUESTION_NEXT_IF_CORECT' });
    }, 2000);
  }

  onStart() {
    const state = store.getState();
    store.dispatch({ type: 'QUESTION_START', newQuestions: state.questions, questionsCount: 5 });
  }

  onNext() {
    store.dispatch({ type: 'QUESTION_NEXT' });
  }

  onPrev() {
    store.dispatch({ type: 'QUESTION_PREVIOUS' });
  }
}

export default Question;
