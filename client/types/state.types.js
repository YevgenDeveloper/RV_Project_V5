// @flow

import type { PlayerType, BookmarkType } from 'client/types';

export type StateType = {
  isFirstStart: boolean,
  isLoading: boolean,
  modal?: string,
  notification?: string,
  errorMessage?: string,
  view?: string,
  rides: string[],
  currentRide: string,
  players: PlayerType[],
  images: {
    [cameraId: string]: string[],
  },
  whatsnew: string[],
  bookmarks: BookmarkType[],
  drawTool: string,
  drawColor: string,
  drawLineWidth: number,
  drawFontsize: string,
  annotationImage?: string,
};
