// @flow

import type { StateType } from 'client/types';

import { cameras, playModes, drawTools } from 'client/constants';

const initialState: StateType = {
  isLoading: true,
  isFirstStart: true,
  modal: undefined,
  notification: undefined,
  view: undefined,
  rides: ['Ehv_Ut_280318', 'Ledn_Wd'],
  currentRide: 'Ledn_Wd',
  players: [
    {
      camera: cameras.CAMERA_1,
      playMode: playModes.PAUSE,
      currentImage: 0,
    },
    {
      camera: cameras.CAMERA_1,
      playMode: playModes.PAUSE,
      currentImage: 0,
    },
  ],
  images: {
    [cameras.CAMERA_1]: [],
    [cameras.CAMERA_2]: [],
    [cameras.CAMERA_3]: [],
    [cameras.CAMERA_4]: [],
  },
  whatsnew: [],
  bookmarks: [],
  drawTool: drawTools.PEN,
  drawColor: 'red',
  drawLineWidth: 2,
  drawFontsize: '20px',
  annotationImage: undefined,
};

export default initialState;
