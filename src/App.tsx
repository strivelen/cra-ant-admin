import { BrowserRouter } from 'react-router-dom';
import Routes from 'router/routes';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import ErrorBoundary from 'component/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
