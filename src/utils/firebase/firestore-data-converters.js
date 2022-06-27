//TODO: add layer/helper that creates objects from docs
export const getQuizResultsFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getQuizResultFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};

export const getQuizResultFromDocSnapshot = (docSnapshot) => {
  const {
    date,
    answers,
    quizId,
    categoryId,
    quizTitle,
    categoryTitle,
    correctAnswersAmount
  } = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    date,
    answers,
    quizId,
    categoryId,
    quizTitle,
    categoryTitle,
    correctAnswersAmount
  };
};

export const getQuizzesFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getQuizFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};

export const getQuizFromDocSnapshot = (docSnapshot) => {
  const { title } = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    title
  };
};

export const getQuestionsFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getQuestionFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};

export const getQuestionFromDocSnapshot = (docSnapshot) => {
  const { content, answers} = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    content,
    answers
  };
};

export const getCategoriesFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getCategoryFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};

export const getCategoryFromDocSnapshot = (docSnapshot) => {
  const { title, icon } = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    title,
    icon
  };
};