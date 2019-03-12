// @flow
import type { ElementType } from 'react';

declare module 'react-hot-loader' {
  declare module.exports: {
    AppContainer: ElementType,
  };
}
