import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from '../src/redux/store';
import Modal from 'react-modal';
import { store } from '../src/redux/store';
import './index.scss';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
  // {/* </React.StrictMode> */}
);
