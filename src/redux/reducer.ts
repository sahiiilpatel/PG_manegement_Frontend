import { combineReducers } from '@reduxjs/toolkit';
// Import other reducers as needed
import tokenReducer from './slice/tokenSlice';
import userReducer from './slice/userSlice';
import loadingReducer from './slice/loadingSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  loading: loadingReducer
  // Add other reducers here
});

export default rootReducer;
