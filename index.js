import { combineReducers } from 'redux';
//renaming reducer as formReducer to avoid confusion
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  //"form" param is specific
  //manage reducers (created by Redux store library) w/in store
  form: formReducer,
  streams: streamReducer
});
