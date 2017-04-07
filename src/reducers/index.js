import { combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

const questions = (state = [], { type, questions }) => {
  switch(type) {
    case 'UPDATE_QUESTIONS':
      return questions;
    default:
      return state;
  }
};

const question = (state, { type, answerIndex, newQuestions, questionsCount }) => {
  if (typeof state === 'undefined') {
    state = {
      index: null,
      questions: []
    };
  }

  deepFreeze(state);

  let current = state.questions[state.index];

  switch(type) {
    case 'QUESTION_START':
      let queue = newQuestions.slice();
      let questionsShuffled = [];

      while (questionsCount-- > 0) {
        let randomIndex = Math.floor(Math.random() * queue.length);
        let question = Object.assign({}, queue.splice(randomIndex, 1)[0]);
        questionsShuffled.push(question);
      }

      return {
        index: 0,
        questions: questionsShuffled
      };
    case 'QUESTION_ANSWER':
      let answered = Object.assign({}, current, { answeredIndex: answerIndex });
      let isCorrect = answered.answeredIndex === answered.answerIndex;

      return Object.assign({}, state, {
        questions: [...state.questions.slice(0, state.index), answered, ...state.questions.slice(state.index + 1)]
      })
    case 'QUESTION_NEXT':
      return Object.assign({}, state, {
        index: state.index + 1
      });
    case 'QUESTION_NEXT_IF_CORECT':
      if (current.answeredIndex !== current.answerIndex) {
        return state;
      }

      return Object.assign({}, state, {
        index: state.index + 1
      });
    case 'QUESTION_PREVIOUS':
      if (state.index <= 0) {
        return state;
      }

      return Object.assign({}, state, {
        index: state.index - 1
      });
    default:
      return state;
  }
}

const stats = (state, { type }) => {
  if (typeof state === 'undefined') {
    state = {};
  }
  switch (type) {
    case 'STATS_RESET':
      return { good: 0, bad: 0, total: 0 };
    case 'STATS_GOOD':
      return Object.assign({}, state, { good: state.good + 1, total: state.total + 1 });
    case 'STATS_BAD':
      return Object.assign({}, state, { bad: state.bad + 1, total: state.total + 1 });
    default:
      return state;
  }
}

const appReducer = combineReducers({
  questions,
  question,
  stats
});

export default appReducer;
