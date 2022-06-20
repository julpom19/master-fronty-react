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
            const { title, icon } = docSnapshot.data();
            const id = docSnapshot.id;
            acc.push({
              id,
              title,
              icon
            });
            return acc;
          }, []);
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
      const { title } = docSnapshot.data();
      const id = docSnapshot.id;
      acc.push({
        id,
        title
      });
      return acc;
    }, []);
};

export const getQuestionsByCategoryAndQuiz = async (categoryId, quizId) => {
  const collectionRef = collection(db, `categories/${categoryId}/quizzes/${quizId}/questions`);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getQuestionsFromDocs(querySnapshot.docs);
};

const getQuestionsFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      const { content, answers} = docSnapshot.data();
      const id = docSnapshot.id;
      acc.push({
        id,
        content,
        answers
      });
      return acc;
    }, []);
};

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
    await addDoc(collection(db, `users/${userId}/quiz_results`), {
      ...quizResult
    });
    return Promise.resolve();
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

const getQuizResultsFromDocs = (docs) => {
  return docs
    .reduce((acc, docSnapshot) => {
      const { timestamp, answers} = docSnapshot.data();
      const id = docSnapshot.id;
      acc.push({
        id,
        timestamp,
        answers
      });
      return acc;
    }, []);
};


