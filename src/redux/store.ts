import { configureStore } from '@reduxjs/toolkit';
// import { loadState, saveState } from './localStorage'; // Example localStorage functions
import rootReducer from './reducer';
import loggerMiddleware from '../helpers/loggerMiddleware';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const preloadedState = loadState();

// Middleware configuration
const middleware = [
  loggerMiddleware // Custom logger middleware
];

// Placeholder for enhancers
const enhancers = [];

const persistConfig = {
  key: 'root',
  storage // Use default local storage
  // whitelist: [userSlice], // Persist only whitelisted slices (optional)
  // blacklist: ['/* reducer slices to exclude */'], // Exclude blacklisted slices (optional)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) // Apply thunk middleware
});

// store.subscribe(() => {
//   saveState(store.getState());
// });
const persistor = persistStore(store);

export { store, persistor };
