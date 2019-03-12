// @flow

import type {
  StateType,
  ReduxAction,
  ReduxHandler,
  BookmarkType,
} from 'client/types';

import { notifications } from 'client/constants';

import initialState from './initialState';
import * as types from './actionTypes';

function createReducer(handlers: { [type: string]: ReduxHandler }) {
  return function reducer(
    state: StateType = initialState,
    action: ReduxAction,
  ) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const reducerRequest = (state: StateType) => ({
  ...state,
  isLoading: true,
});

const reducerFailure = (
  state: StateType,
  action: { errorMessage: string },
) => ({
  ...state,
  isLoading: false,
  errorMessage: action.errorMessage,
});

const reducerLoad = (
  state: StateType,
  action: { payload: { whatsnew: string[] } },
) => ({
  ...state,
  ...action.payload,
  isLoading: false,
});

const reducerModal = (state: StateType, action: { payload: ?string }) => ({
  ...state,
  modal: action.payload,
});

const reducerNotification = (
  state: StateType,
  action: { payload: ?string },
) => ({
  ...state,
  notification: action.payload,
});

const reducerRide = (state: StateType, action: { payload: string }) => ({
  ...state,
  currentRide: action.payload,
});

const reducerView = (state: StateType, action: { payload: ?string }) => ({
  ...state,
  view: action.payload !== state.view ? action.payload : undefined,
});

const reducerPlayer = (
  state: StateType,
  action: { player: number, payload: {} },
) => {
  const players = [...state.players];

  players[action.player] = {
    ...players[action.player],
    ...action.payload,
  };

  return {
    ...state,
    players,
  };
};

const reducerBookmark = (
  state: StateType,
  action: { player: number, payload: BookmarkType },
) => {
  const { payload } = action;
  const bookmarks = [...state.bookmarks];
  const index = bookmarks.findIndex(
    bookmark =>
      bookmark.ride === payload.ride &&
      bookmark.camera === payload.camera &&
      bookmark.image === payload.image,
  );

  if (index > 0) {
    bookmarks.splice(index, 1);
    return {
      ...state,
      bookmarks,
      notification: notifications.BOOKMARK_REMOVED,
    };
  }

  return {
    ...state,
    bookmarks: [...bookmarks, payload],
    notification: notifications.BOOKMARK_ADDED,
  };
};

const reducerAnnotationTool = (
  state: StateType,
  action: { payload: { drawTool: string } },
) => ({
  ...state,
  ...action.payload,
});

const reducerAnnotationImage = (
  state: StateType,
  action: { payload: ?string },
) => ({
  ...state,
  annotationImage: action.payload,
});

export default createReducer({
  [types.REQUEST]: reducerRequest,
  [types.FAILURE]: reducerFailure,
  [types.LOAD]: reducerLoad,
  [types.MODAL_OPEN]: reducerModal,
  [types.MODAL_CLOSE]: reducerModal,
  [types.NOTIFICATION_SHOW]: reducerNotification,
  [types.NOTIFICATION_HIDE]: reducerNotification,
  [types.RIDE_CHANGE]: reducerRide,
  [types.VIEW_CHANGE]: reducerView,
  [types.PLAYER_UPDATE]: reducerPlayer,
  [types.BOOKMARK]: reducerBookmark,
  [types.ANNOTATION_TOOL_CHANGE]: reducerAnnotationTool,
  [types.ANNOTATION_IMAGE_CHANGE]: reducerAnnotationImage,
});
