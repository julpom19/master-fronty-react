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

