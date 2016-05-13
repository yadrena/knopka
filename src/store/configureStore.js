import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export default () => createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      createLogger({
        //predicate: (getState, action) => __DEV__,
        collapsed: true
      })
    )
  );