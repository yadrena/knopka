import { createStore, applyMiddleware, compose } from 'redux';
import {autoRehydrate} from 'redux-persist'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron';
import rootReducer from '../reducers/rootReducer';

export default () => {
  const enhancer = compose(
    autoRehydrate(),
    applyMiddleware(
      thunk,
      createLogger({
        predicate: (getState, action) => __DEV__,
        collapsed: true
      }),
      Reactotron.reduxMiddleware
    )
  );
  const store = createStore(rootReducer, enhancer);
  Reactotron.addReduxStore(store);
  return store;
}