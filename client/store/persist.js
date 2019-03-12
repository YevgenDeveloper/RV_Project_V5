// @flow

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { storageNames } from 'client/constants';

export const persistConfig = {
  key: storageNames.STATE,
  keyPrefix: '',
  storage,
  blacklist: ['isFirstStart', 'rides', 'images', 'modal', 'notification'],
};

export default function createPersistReducer(reducer: Object) {
  return persistReducer(persistConfig, reducer);
}
