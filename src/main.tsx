import './styles.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { fetchUsers } from './features/users/usersSlice.ts';
import { store } from './store.ts';

function start() {
  store.dispatch(fetchUsers());

  const root = createRoot(document.getElementById('root')!);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}

start();
