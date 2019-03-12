// @flow
import type { ComponentType } from 'react';

declare module 'react-router-redux' {
  declare module.exports: {
    ConnectedRouter: ComponentType<{}>,
    routerReducer: Object,
    routerMiddleware: (any, any) => void,
  };
}
