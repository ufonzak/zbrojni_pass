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
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Question {question.index + 1} / {question.questions.length}</h3>
          </div>
          <div className="panel-body">
            <p>{questionObject.question}</p>
          </div>
          <ul className="list-group">
            {questionObject.options.map((option, index) => {
              let className = null;
              if (hasAnswered) {
                if (index === questionObject.answeredIndex) {
                  className = hasAnsweredCorrectly ? 'list-group-item-success' : 'list-group-item-danger';
                }
                else if (index === questionObject.answerIndex) {
                  className = 'list-group-item-warning';
                }
              }

              return <li className={["list-group-item", className].join(' ')} key={index}
                onClick={hasAnswered ? null : this.onQuestionClick.bind(this, index)}>
                {option}
              </li>;
            })}
          </ul>
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
    return <div className="panel panel-default">
      <div className="panel-body">
        Click Start New.
      </div>
    </div>;
  }
}
class EndBanner extends Component {
  render() {
    return <div className="panel panel-default">
      <div className="panel-body">
        All done. Click Start New.
      </div>
    </div>;
  }
}

class QuestionControls extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={this.onStart.bind(this)}>Start New</button>
          </div>
          <div className="btn-group pull-right" role="group">
            <button type="button" className="btn btn-default" onClick={this.onPrev.bind(this)}>Prev</button>
            <button type="button" className="btn btn-default" onClick={this.onNext.bind(this)}>Next</button>
          </div>
        </div>
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
      <div className="row">
        <div className="col-md-12">
          {control}
        </div>
        <div className="col-md-12">
          <QuestionControls/>
        </div>
        <div className="col-md-4">
          <Stats state={question.stats} />
        </div>
      </div>
    );
  }
}

export default Question;
