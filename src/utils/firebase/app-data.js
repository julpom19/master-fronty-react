export const CATEGORIES = {
  js: {
    title: 'JS',
    icon: 'https://i.ibb.co/gzB0n6f/javascript.png',
    showable: true
  },
  css: {
    title: 'CSS',
    icon: 'https://i.ibb.co/L6987L8/css.png',
    showable: true
  },
  html: {
    title: 'HTML',
    icon: 'https://i.ibb.co/FxbrD8d/html.png',
    showable: true
  }
};

const QUIZ_TYPE = {
  RANDOM: 'RANDOM',
  DEFINED: 'DEFINED'
}

export const QUIZZES = {
  'js_basic': {
    title: 'Javascript Basic',
    description: 'Questions about variables, types',
    quiz_type: QUIZ_TYPE.DEFINED,
    showable: true,
    categoryId: 'js'
  },
  'js_advanced': {
    title: 'Javasctipt Advanced',
    description: 'Questions about functions, prototypes',
    quiz_type: QUIZ_TYPE.DEFINED,
    showable: true,
    categoryId: 'js'
  }
};

export const QUESTIONS = [
  {
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'How are you today?',
    showable: true,
    answers: [
      {
        content: 'Bad',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'Ok',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'Great',
        isCorrect: false,
        showable: true,
      },
    ]
  },
  {
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'How old are you?',
    showable: true,
    answers: [
      {
        content: '5',
        isCorrect: false,
        showable: true,
      },
      {
        content: '25',
        isCorrect: true,
        showable: true,
      },
      {
        content: '45',
        isCorrect: false,
        showable: true,
      },
    ]
  },
  {
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'How many friends do you have?',
    showable: true,
    answers: [
      {
        content: '0',
        isCorrect: false,
        showable: true,
      },
      {
        content: '5',
        isCorrect: true,
        showable: true,
      },
      {
        content: '20',
        isCorrect: false,
        showable: true,
      },
    ]
  }
];