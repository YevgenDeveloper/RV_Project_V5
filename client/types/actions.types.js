// @flow

import type { BookmarkType } from 'client/types';

export type ActionType = {
  load: void => void,
  toggleModal: (modal: ?string) => void,
  toogleBookmark: (bookmark: ?BookmarkType) => void,
  navigate: BookmarkType => void,
  changeView: (view?: string) => void,
  changeRide: (ride: string) => void,
  toggleNotification: (notification?: string) => void,
  updatePlayer: (playerIndex: number, payload: {}) => void,
  annotate: void => void,
  saveAnnotation: void => void,
  openSaveAnnotation: (image: string) => void,
  changeAnnotationTool: ({ drawTool: string }) => void,
  measurement: void => void,
  downloadImage: void => void,
};
