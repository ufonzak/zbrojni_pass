import { combineReducers } from 'redux';

const questions = (state = [], { type, questions }) => {
  switch(type) {
    case 'UPDATE_QUESTIONS':
      return questions;
    default:
      return state;
  }
};

const question = (state, { type, answerIndex }) => {
  if (typeof state === 'undefined') {
    state = {
      index: null
    };
  }

  switch(type) {
    case 'QUESTION_START':
      return {
        index: 0
      };
    case 'QUESTION_ANSWER':
      return Object.assign({}, state, {
        answerIndex: answerIndex,
      })
    case 'QUESTION_NEXT':
      return Object.assign({}, state, {
        index: state.index + 1,
        answerIndex: null,
      });
    default:
      return state;
  }
}

const appReducer = combineReducers({
  questions,
  question
});

export default appReducer;
