// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createPersistReducer from 'client/store/persist';
import reducer from 'client/store/reducer';

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default function configStore(): Object {
  const store = createStore(
    createPersistReducer(reducer),
    // $FlowFixMe
    composeEnhancers(applyMiddleware(thunk)),
  );

  if (module.hot) {
    module.hot.accept('client/store/reducer', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('client/store/reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
