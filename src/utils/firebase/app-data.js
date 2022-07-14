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
  {//1
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'Choose the correct list of data types in javascript.',
    showable: true,
    answers: [
      {
        content: 'Number, String, Boolean, Object, Array, Function',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'Number, String, Boolean, BigInt, Symbol, Undefined, Null, Object',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'Number, String, Boolean, Undefined, Null, Object ',
        isCorrect: false,
        showable: true,
      },
    ]
  },
  {//2
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'What is the output of expression "console.log(typeof null === "object")"?',
    showable: true,
    answers: [
      {
        content: 'true',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'false',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'object',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'null',
        isCorrect: false,
        showable: true,
      }
    ]
  },
  {//3
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'Which statement is correct?',
    showable: true,
    answers: [
      {
        content: 'The directive "use strict" forbids usage of "var" key word.',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'The directive "use strict" can be applied to block statements like "IF" block.',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'Modules and classes are automatically in strict mode.',
        isCorrect: true,
        showable: true,
      }
    ]
  },
  {//4
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'What variable name is NOT allowed in Javascript?',
    showable: true,
    answers: [
      {
        content: '_',
        isCorrect: false,
        showable: true,
      },
      {
        content: '$',
        isCorrect: false,
        showable: true,
      },
      {
        content: '&',
        isCorrect: true,
        showable: true,
      }
    ]
  },
  {//5
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'Which block of code will NOT invoke error?',
    showable: true,
    questionType: 'CODE',
    answers: [
      {
        content: 'val = 10;\nconsole.log(val);',
        isCorrect: true,
        showable: true,
      },
      {
        content: '"use strict"\nval = 10;\nconsole.log(val);',
        isCorrect: false,
        showable: true,
      },
      {
        content: '"use strict"\nconst val = 10;\nval = 5;\nconsole.log(val);',
        isCorrect: false,
        showable: true,
      }
    ]
  },
  {//6
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'What is the type of special values Infinity and NaN?',
    showable: true,
    answers: [
      {
        content: 'Object',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'BigInt',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'Number',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'Symbol',
        isCorrect: false,
        showable: true,
      }
    ]
  },
  {//7
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'Which block of code will invoke error?',
    showable: true,
    questionType: 'CODE',
    answers: [
      {
        content: 'const val = "world";\nconsole.log(`Hello ${val}`);',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'const val = "world";\nconsole.log("Hello " + val);',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'const val = "world";\nconsole.log("Hello ".add(val));',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'const val = "world";\nconsole.log("Hello ".concat(val));',
        isCorrect: false,
        showable: true,
      }
    ]
  },
  {//8
    quizId: 'js_basic',
    categoryId: 'js',
    content: 'Which block of code will invoke error?',
    showable: true,
    questionType: 'CODE',
    answers: [
      {
        content: 'const val = "world";\nconsole.log(`Hello ${val}`);',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'const val = "world";\nconsole.log("Hello " + val);',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'const val = "world";\nconsole.log("Hello ".add(val));',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'const val = "world";\nconsole.log("Hello ".concat(val));',
        isCorrect: false,
        showable: true,
      }
    ]
  },

  //JS_ADVANCED
  {//1
    quizId: 'js_advanced',
    categoryId: 'js',
    content: 'What states can a Promise be in?',
    showable: true,
    questionType: 'CODE',
    answers: [
      {
        content: 'pending, fulfilled, rejected',
        isCorrect: true,
        showable: true,
      },
      {
        content: 'started, successful, failed',
        isCorrect: false,
        showable: true,
      },
      {
        content: 'progress, resolved, rejected',
        isCorrect: false,
        showable: true,
      }
    ]
  },
  {//2
    quizId: 'js_advanced',
    categoryId: 'js',
    content: 'What numbers will be printed to console as a result of the following code execution?',
    code: 'let promise = new Promise(function(resolve, reject) {\n' +
      'console.log("1");\n' +
      'resolve("2");\n' +
      'reject("3");\n' +
      'setTimeout(() => resolve("4"));\n' +
      '});\n\n' +
      'promise.then(console.log).catch(console.log).finally(() => console.log("5");',
    showable: true,
    questionType: 'CODE',
    answers: [
      {
        content: '1 2 3 4 5',
        isCorrect: false,
        showable: true,
      },
      {
        content: '1 2 5 4',
        isCorrect: false,
        showable: true,
      },
      {
        content: '1 2 5',
        isCorrect: true,
        showable: true,
      }
    ]
  },
  ,
  {//3
    quizId: 'js_advanced',
    categoryId: 'js',
    content: 'What will be printed to console as a result of the following code execution?',
    code: 'Promise.all([\n' +
      '  new Promise(resolve => setTimeout(() => resolve(1), 3000)),\n' +
      '  new Promise(resolve => setTimeout(() => resolve(2), 2000)),\n' +
      '  new Promise(resolve => setTimeout(() => resolve(3), 1000))\n' +
      ']).then(console.log);',
    showable: true,
    questionType: 'CODE',
    answers: [
      {
        content: '[1, 2, 3]',
        isCorrect: true,
        showable: true,
      },
      {
        content: '[3, 2, 1]',
        isCorrect: false,
        showable: true,
      },
      {
        content: '[object Object]',
        isCorrect: false,
        showable: true,
      }
    ]
  },
];

let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(20), 3000);
});

promise
  .finally(() => console.log('Promise completed its work'))
  .then((value) => console.log(value))
  .catch(error => console.log(error));

async function f() {
  return;
}
f().then(val => console.log(val));


