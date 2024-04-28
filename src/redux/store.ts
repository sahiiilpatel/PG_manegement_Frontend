import { configureStore } from '@reduxjs/toolkit';
// import { loadState, saveState } from './localStorage'; // Example localStorage functions
import rootReducer from './reducer';
import loggerMiddleware from '../helpers/loggerMiddleware';
import { thunk } from 'redux-thunk';

// const preloadedState = loadState();

// Middleware configuration
const middleware = [
  loggerMiddleware // Custom logger middleware
];

// Placeholder for enhancers
const enhancers = [];

// Redux store configuration
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) // Apply thunk middleware
});

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
