import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const middleWares = [
  // process.env.NODE_ENV === 'development' && logger,
  thunk,
].filter(
  Boolean
);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);