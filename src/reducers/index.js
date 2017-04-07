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
      questions: [],
      stats: stats()
    };
  }

  deepFreeze(state);

  let current = state.questions[state.index];

  switch(type) {
    case 'QUESTION_START':
      let queue = newQuestions.slice();
      let questionsShuffled = [];

      let count = questionsCount;
      while (count-- > 0) {
        let randomIndex = Math.floor(Math.random() * queue.length); //not pure
        let question = Object.assign({}, queue.splice(randomIndex, 1)[0]);
        questionsShuffled.push(question);
      }

      return {
        index: 0,
        questions: questionsShuffled,
        stats: stats(null, { total: questionsCount })
      };
    case 'QUESTION_ANSWER':
      let answered = Object.assign({}, current, { answeredIndex: answerIndex });
      let isCorrect = answered.answeredIndex === answered.answerIndex;

      return Object.assign({}, state, {
        questions: [...state.questions.slice(0, state.index), answered, ...state.questions.slice(state.index + 1)],
        stats: stats(state.stats, { good: isCorrect ? 1 : 0, bad: isCorrect ? 0 : 1 })
      })
    case 'QUESTION_NEXT':
      if (state.index >= state.questions.length) {
        return state;
      }

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
};

const stats = (state, { good, bad, total } = {}) => {
  if (!state) {
    state = { good: 0, bad: 0, total: total || 0 };
  }

  return Object.assign({}, state, {
    good: state.good + (good || 0),
    bad: state.bad + (bad || 0)
  });
};

const appReducer = combineReducers({
  questions,
  question
});

export default appReducer;
