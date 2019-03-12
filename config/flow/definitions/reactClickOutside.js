// @flow
import type { ComponentType } from 'react';

declare module 'react-click-outside' {
  declare module.exports: (ComponentType<{}>) => ComponentType<{}>;
}
