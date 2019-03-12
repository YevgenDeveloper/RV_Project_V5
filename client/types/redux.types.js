// @flow

import type { StateType } from 'client/types';

export type ReduxAction = {
  +type: string,
  payload?: any,
};

export type GetState = () => StateType;

type PromiseAction = Promise<ReduxAction>;

/* eslint-disable-next-line no-use-before-define */
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (
  action: ReduxAction | ThunkAction | PromiseAction | Array<ReduxAction>,
) => any;

export type ReduxHandler = (state: Object, action: Object) => mixed;
