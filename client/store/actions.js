// @flow

import type { Dispatch, GetState } from 'client/types';

import download from 'downloadjs';

import { getImagesFromCamera, getImageUrl } from 'client/services';
import { modals, cameras, playModes, views } from 'client/constants';
import * as types from './actionTypes';

export const toggleModal = (payload: ?string) => ({
  type: payload ? types.MODAL_OPEN : types.MODAL_CLOSE,
  payload,
});

export const load = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    dispatch({ type: types.REQUEST });

    const { currentRide, isFirstStart } = getState();

    const payload = {
      images: {
        [cameras.CAMERA_1]: await getImagesFromCamera(
          currentRide,
          cameras.CAMERA_1,
        ),
        [cameras.CAMERA_2]: await getImagesFromCamera(
          currentRide,
          cameras.CAMERA_2,
        ),
        [cameras.CAMERA_3]: await getImagesFromCamera(
          currentRide,
          cameras.CAMERA_3,
        ),
        [cameras.CAMERA_4]: await getImagesFromCamera(
          currentRide,
          cameras.CAMERA_4,
        ),
      },
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
      isFirstStart: false,
      whatsnew: [
        'Redesigned and improved user interface.',
        'Added Measurement function to the determine distances between points.',
        'Added Annotation function to create notes on images.',
        'Added Comparison function to compare images of two records.',
      ],
    };

    if (isFirstStart) {
      dispatch(toggleModal(modals.WHATS_NEW));
    }

    dispatch({
      type: types.LOAD,
      payload,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.FAILURE,
      errorMessage: `${error.name}: ${error.message}`,
    });
  }
};

export const toggleNotification = (payload: ?string) => ({
  type: payload ? types.NOTIFICATION_SHOW : types.NOTIFICATION_HIDE,
  payload,
});

export const changeRide = (payload: string) => (dispatch: Dispatch) => {
  dispatch({ type: types.RIDE_CHANGE, payload });
  dispatch(toggleModal());
  dispatch(load());
};

export const changeView = (payload: ?string) => ({
  type: types.VIEW_CHANGE,
  payload,
});

export const updatePlayer = (player: number, payload: {}) => ({
  type: types.PLAYER_UPDATE,
  player,
  payload,
});

export const downloadImage = () => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  try {
    const { images, players, currentRide } = getState();
    const image = images[players[0].camera][players[0].currentImage];

    download(getImageUrl(currentRide, players[0].camera, image));
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.FAILURE,
      errorMessage: `${error.name}: ${error.message}`,
    });
  }
};

export const toogleBookmark = () => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const { players, currentRide } = getState();

  dispatch({
    type: types.BOOKMARK,
    payload: {
      ride: currentRide,
      camera: players[0].camera,
      image: players[0].currentImage,
    },
  });
};

export const navigate = (payload: Object) => (dispatch: Dispatch) => {
  dispatch(toggleModal());
  dispatch(
    updatePlayer(0, {
      playMode: playModes.PAUSE,
      camera: payload.camera,
      currentImage: payload.image,
    }),
  );
};

export const annotate = () => (dispatch: Dispatch) => {
  dispatch(
    updatePlayer(0, {
      playMode: playModes.PAUSE,
    }),
  );
  dispatch(
    updatePlayer(1, {
      playMode: playModes.PAUSE,
    }),
  );
  dispatch(changeView(views.ANNOTATION));
};

export const changeAnnotationTool = (payload: { drawTool: string }) => ({
  type: types.ANNOTATION_TOOL_CHANGE,
  payload,
});

export const openSaveAnnotation = (payload: string) => (dispatch: Dispatch) => {
  dispatch(toggleModal(modals.SAVE_ANNOTATION));
  dispatch({
    type: types.ANNOTATION_IMAGE_CHANGE,
    payload,
  });
};

export const saveAnnotation = () => (dispatch: Dispatch) => {
  dispatch(toggleModal());
  dispatch(changeView());
  dispatch({ type: types.ANNOTATION_IMAGE_CHANGE });
};

export const measurement = () => (dispatch: Dispatch) => {
  dispatch(
    updatePlayer(0, {
      playMode: playModes.PAUSE,
    }),
  );
  dispatch(
    updatePlayer(1, {
      playMode: playModes.PAUSE,
    }),
  );
  dispatch(changeView(views.MEASUREMENT));
};
