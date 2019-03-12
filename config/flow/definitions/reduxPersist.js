// @flow
import type { Reducer } from 'redux';

declare module 'redux-persist' {
  declare module.exports: {
    persistReducer: Reducer,
    persistStore: Object => {
      purge: () => mixed,
    },
    purgeStoredState: Object => void,
  };
}

declare module 'redux-persist/integration/react' {
  declare module.exports: {
    PersistGate: ComponentType<{}>,
  };
}

declare module 'redux-persist/lib/storage' {
  declare module.exports: Object;
}

declare module 'redux-persist-transform-filter' {
  declare module.exports: {
    createWhitelistFilter: (string, string[]) => string[],
    createBlacklistFilter: (string, string[]) => string[],
  };
}
