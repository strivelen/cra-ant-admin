import { BrowserRouter } from 'react-router-dom';
import Routes from 'app/routes';
import { Provider } from 'react-redux';
import { store, persistor } from 'app/store';
import ErrorBoundary from 'component/ErrorBoundary';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
