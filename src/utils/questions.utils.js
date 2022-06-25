export const getQuestionsAnswered = (questions, userAnswers) => {
  return questions.map(q => {
    let isCorrectlyAnswered = false;
    const qAnswers = q.answers.map(qAnswer => {
      const userAnswer = userAnswers.find(userAnswer => userAnswer.questionId === q.id);
      const isSelectedByUser = userAnswer.answerId === qAnswer.id;
      if(isSelectedByUser && qAnswer.isCorrect) {
        isCorrectlyAnswered = true;
      }
      return {...qAnswer, isSelectedByUser};
    });
    return {...q, answers: qAnswers, isCorrectlyAnswered};
  });
};

export const calculateCorrectAnswersAmount = (questionsAnswered) => {
  return questionsAnswered.reduce((acc, qAnswered) => qAnswered.isCorrectlyAnswered ? acc + 1 : acc, 0);
};
//isCorrect = true - this is correct answer - style with green borders
//isSelectedByUser && isCorrect - user gave correct answer - style with green background + check mark
//isSelectedByUser && !isCorrect - user gave wrong answer - style with red background + cross mark