import { combineReducers } from 'redux';
import routes from './routesReducers';
import auth from './authReducer';
// ... other reducers

export default combineReducers({
  auth,
  routes
});