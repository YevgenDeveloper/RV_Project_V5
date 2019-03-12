// @flow
import type { ElementType } from 'react';

declare module 'react-custom-scrollbars' {
  declare module.exports: {
    Scrollbars: ElementType,
  };
}
