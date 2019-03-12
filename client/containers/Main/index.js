// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { checkAndUpdateAppVersion, isAuthorized } from 'client/services';
import configStore from 'client/store';
import { App, Login } from 'client/containers';

export default function Main() {
  const store: Object = configStore();
  const persistor = persistStore(store);

  if (checkAndUpdateAppVersion()) {
    persistor.purge();
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isAuthorized() ? (
          // $FlowFixMe
          <App />
        ) : (
          <Login />
        )}
      </PersistGate>
    </Provider>
  );
}
