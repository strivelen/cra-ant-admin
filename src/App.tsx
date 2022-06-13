import { BrowserRouter } from 'react-router-dom';
import Routes from 'router/routes';
import ErrorBoundary from 'component/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
