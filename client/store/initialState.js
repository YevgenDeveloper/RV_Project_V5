// @flow

import type { StateType } from 'client/types';

import { cameras, playModes, drawTools, bdConnectUrl } from 'client/constants';

console.log(bdConnectUrl);
const initialState: StateType = {
  isLoading: true,
  isFirstStart: true,
  modal: undefined,
  notification: undefined,
  view: undefined,
  rides: [
    'Gd_Apn',
    'Ehv_Ut',
    'Ledn_Shl',
    'Apn_Ledn',
    'Gd_Wad',
    'Gvc_Wd',
    'Hlm_Gvc',
    'Ledn_Wd',
    'Nwk_Gd',
    'Sdm_Vh',
    'Shl_Ledn',
    'Wd_Nwk',
    'Ut_Ehv',
    'Btl_Gz',
    'Gz_Btl',
    'Gz_Nml',
    'Nml_Gz',
    'Ldm_Gdm',
    'Gdm_Ti',
    'Ti_Gdm',
    'Gdm_Ldm',
  ],
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
