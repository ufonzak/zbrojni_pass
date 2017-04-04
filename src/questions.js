import store from './store';
import $ from "jquery";
import co from 'co';

const parseQuestion = (index, questionDiv) => {
  questionDiv = $(questionDiv);
  let ps = questionDiv.find('p');
  let question = $(ps[0]).text();
  let optionA = $(ps[2]).text();
  let optionB = $(ps[4]).text();
  let optionC = $(ps[6]).text();
  let corretAnswerIndex = questionDiv.find('.correct-answer').index() - 1;
  return {
    index,
    question,
    options: [optionA, optionB, optionC],
    answerIndex: corretAnswerIndex
  };
};

const updateQuestions = () =>
  co(function*() {
    try {
      let response = yield fetch('questions.html');

      let text = yield response.text();

      let questionsPage = $(text);
      let questionDivs = questionsPage.find('#questions').children();
      let questions = questionDivs.map(parseQuestion).toArray();

      console.log(`Fetched ${questions.length} questions.`);

      store.dispatch({ type: 'UPDATE_QUESTIONS', questions });
    }
    catch(er) {
      console.log(`Error when getting questions: ${er}`);
    }
  });

setTimeout(function () {
  updateQuestions();
}, 1000);

export default {};
