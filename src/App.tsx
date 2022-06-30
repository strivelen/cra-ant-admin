import { BrowserRouter } from 'react-router-dom';
import Routes from 'app/routes';
import { Provider } from 'react-redux';
import { store, persistor } from 'app/store';
import ErrorBoundary from 'component/ErrorBoundary';
import { PersistGate } from 'redux-persist/integration/react';

// 配置国际化（本地化时出现的中英文各一半可以通过删除node_module和lock文件然后重新安装即可解决）
import { ConfigProvider } from 'antd';
import * as dayjs from 'dayjs';
import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={zhCN} input={{ autoComplete: 'off' }}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
