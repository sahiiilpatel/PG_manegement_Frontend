import { Provider } from 'react-redux';
import { Toaster } from './components/ui/toaster';
import AppProvider from './providers';
import AppRouter from './routes';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <AppRouter />
        </PersistGate>
      </Provider>
    </AppProvider>
  );
}
