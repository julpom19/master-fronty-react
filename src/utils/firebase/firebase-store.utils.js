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
import {
  getCategoriesFromDocs,
  getQuestionsFromDocs,
  getQuizFromDocSnapshot,
  getQuizResultFromDocSnapshot,
  getQuizResultsFromDocs,
  getQuizzesFromDocs,
} from './firestore-data-converters';

initFirebaseApp();
export const db = getFirestore();

//TODO: add where showable = true
export const getCategories = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getCategoriesFromDocs(querySnapshot.docs);
};

export const getQuizzesByCategory = async (categoryId) => {
  const collectionRef = collection(db, `categories/${categoryId}/quizzes`);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getQuizzesFromDocs(querySnapshot.docs);
};

export const getQuestionsByCategoryAndQuiz = async (categoryId, quizId) => {
  const collectionRef = collection(db, `categories/${categoryId}/quizzes/${quizId}/questions`);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return getQuestionsFromDocs(querySnapshot.docs);
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


