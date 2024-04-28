import { Provider } from 'react-redux';
import { Toaster } from './components/ui/toaster';
import AppProvider from './providers';
import AppRouter from './routes';
import store from '../src/redux/store';

export default function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <Toaster />
        <AppRouter />
      </Provider>
    </AppProvider>
  );
}
