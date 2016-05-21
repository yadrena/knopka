import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron';
import rootReducer from '../reducers/rootReducer';

export default () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      createLogger({
        predicate: (getState, action) => __DEV__,
        collapsed: true
      }),
      Reactotron.reduxMiddleware
    )
  );
  Reactotron.addReduxStore(store);
  return store;
}