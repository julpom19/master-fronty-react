import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc
} from 'firebase/firestore';
import { initFirebaseApp } from './firebase.utils';

initFirebaseApp();
export const db = getFirestore();

//TODO: add where showable = true
export const getCategories = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getCategoriesFromDocs(querySnapshot.docs);
};

const getCategoriesFromDocs = (docs) => {
  return docs
          .reduce((acc, docSnapshot) => {
            acc.push(getCategoryFromDocSnapshot(docSnapshot));
            return acc;
          }, []);
};

const getCategoryFromDocSnapshot = (docSnapshot) => {
  const { title, icon } = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    title,
    icon
  };
};

export const getQuizzesByCategory = async (categoryId) => {
  const collectionRef = collection(db, `categories/${categoryId}/quizzes`);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getQuizzesFromDocs(querySnapshot.docs);
};

const getQuizzesFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getQuizFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};

const getQuizFromDocSnapshot = (docSnapshot) => {
  const { title } = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    title
  };
}

export const getQuestionsByCategoryAndQuiz = async (categoryId, quizId) => {
  const collectionRef = collection(db, `categories/${categoryId}/quizzes/${quizId}/questions`);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getQuestionsFromDocs(querySnapshot.docs);
};

const getQuestionsFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getQuestionFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};

const getQuestionFromDocSnapshot = (docSnapshot) => {
  const { content, answers} = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    content,
    answers
  };
}

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const submitQuizResult = async (userId, quizResult) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/quiz_results`), {
      ...quizResult
    });
    const docSnapshot = await getDoc(docRef);
    return getQuizResultFromDocSnapshot(docSnapshot);
  } catch (error) {
    console.log('error storing quiz result', error.message);
  }
};

export const getQuizResultsByUser = async (userId) => {
  const collectionRef = collection(db, `users/${userId}/quiz_results`);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getQuizResultsFromDocs(querySnapshot.docs);
};

export const getQuizResultByUser = async (userId, quizResultId) => {
  const docRef = doc(db, `users/${userId}/quiz_results`, quizResultId);
  const docSnapshot = await getDoc(docRef);

  return getQuizResultFromDocSnapshot(docSnapshot);
};

const getQuizResultFromDocSnapshot = (docSnapshot) => {
  const { date, answers, quizId, categoryId} = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    id,
    date,
    answers,
    quizId,
    categoryId
  }
}

export const getQuiz = async (categoryId, quizId) => {
  const docRef = doc(db, `categories/${categoryId}/quizzes`, quizId);
  const docSnapshot = await getDoc(docRef);

  return getQuizFromDocSnapshot(docSnapshot);
};

export const getQuestions = async (categoryId, quizId) => {
  const docRef = doc(db, `categories/${categoryId}/quizzes`, quizId);
  const docSnapshot = await getDoc(docRef);

  return getQuizFromDocSnapshot(docSnapshot);
};

//TODO: add layer/helper that creates objects from docs

const getQuizResultsFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      acc.push(getQuizResultFromDocSnapshot(docSnapshot));
      return acc;
    }, []);
};


