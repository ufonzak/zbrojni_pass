import React, { Component } from 'react';
import store from '../store';
import Stats from './Stats'

class CurrentQuestion extends Component {

    componentWillUnmount() {
      clearTimeout(this.nextQuestionTimer);
    }

    render() {
      const question = this.props.question;
      let index = question.index;
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
}

class StartBanner extends Component {
  render() {
    return <div>Click Start New.</div>;
  }
}
class EndBanner extends Component {
  render() {
    return <div>All done. Click Start New.</div>;
  }
}

class QuestionControls extends Component {
  render() {
        return (
      <div>
          <button onClick={this.onStart.bind(this)}>Start New</button>
          <button onClick={this.onPrev.bind(this)}>Prev</button>
          <button onClick={this.onNext.bind(this)}>Next</button>
      </div>
    );
  }

  onStart() {
    const state = store.getState();
    store.dispatch({ type: 'QUESTION_START', newQuestions: state.questions, questionsCount: 30 });
  }

  onNext() {
    store.dispatch({ type: 'QUESTION_NEXT' });
  }

  onPrev() {
    store.dispatch({ type: 'QUESTION_PREVIOUS' });
  }
}

class Question extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const question = store.getState().question;

    let index = question.index;

    let control;
    if (index === null) {
      control = <StartBanner/>;
    } else if (index >= question.questions.length) {
      control = <EndBanner/>;
    } else {
      control = <CurrentQuestion question={question} />;
    }

    return (
      <div>
        {control}
        <QuestionControls/>
        <Stats state={question.stats} />
      </div>
    );
  }
}

export default Question;
