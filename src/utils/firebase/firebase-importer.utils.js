import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  writeBatch
} from 'firebase/firestore';
import { initFirebaseApp } from './firebase.utils';
import { CATEGORIES, QUESTIONS, QUIZZES } from './app-data';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

initFirebaseApp();
export const db = getFirestore();

let isDataLoaded = false;

export const loadDataToFirestore = async () => {
  if(isDataLoaded) return;
  await loadCategories();
  await loadQuizzes();
  await loadQuestions();
  isDataLoaded = true;
};

const loadCategories = () => {
  return addCollectionObject('categories', CATEGORIES);
};

const loadQuizzes = async () => {

  const batch = writeBatch(db);

  Object.entries(QUIZZES).forEach(([quizId, quizObject]) => {
    const collectionRef = collection(db, `categories/${quizObject.category_id}/quizzes`);
    const docRef = doc(collectionRef, quizId);
    quizObject = {...quizObject};
    delete quizObject.category_id;
    batch.set(docRef, quizObject);
  });
  await batch.commit();
};

const loadQuestions = async () => {
  generateIdsForAnswers();
  const batch = writeBatch(db);

  QUESTIONS.forEach(question => {
    const collectionRef = collection(db, `categories/${question.category_id}/quizzes/${question.quiz_id}/questions`);
    const docRef = doc(collectionRef);
    question = {...question};
    delete question.category_id;
    delete question.quiz_id;
    batch.set(docRef, question);
  });

  await batch.commit();
}

export const generateIdsForAnswers = () => {
  const generatedIds = {};
  QUESTIONS.forEach(question => {
    question.answers.forEach(answer => {
      let id;
      do {
        id = generateId();
        if(!generatedIds[id]) {
          generatedIds[id] = id;
          break;
        }
      } while (true);
      answer.id = id;
    });
  });
  console.log(QUESTIONS);
};

const generateId = () => {
  return Math.random().toString(16).slice(2);
};


const addCollectionObject = async (collectionKey, objectContainer) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  Object.entries(objectContainer).forEach(([key, value]) => {
    const docRef = doc(collectionRef, key);
    batch.set(docRef, value);
  });
  await batch.commit();
};

const addCollectionArray = async (collectionKey, arrayContainer) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  arrayContainer.forEach(object => {
    const docRef = doc(collectionRef);
    batch.set(docRef, object);
  });

  await batch.commit();

};