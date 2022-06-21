export const getQuestionsAnswered = (questions, userAnswers) => {
  return questions.map(q => {
    const qAnswers = q.answers.map(qAnswer => {
      const userAnswer = userAnswers.find(userAnswer => userAnswer.questionId === q.id);
      const isSelectedByUser = userAnswer.answerId === qAnswer.id;
      return {...qAnswer, isSelectedByUser};
    });
    return {...q, answers: qAnswers};
  });
}
//isCorrect = true - this is correct answer - style with green borders
//isSelectedByUser && isCorrect - user gave correct answer - style with green background + check mark
//isSelectedByUser && !isCorrect - user gave wrong answer - style with red background + cross mark