// @flow

import type { BookmarkType } from 'client/types';

import React from 'react';

import { Modal } from 'client/components';
import Bookmark from './Bookmark';

type Props = {
  images: ?{
    [cameraId: string]: string[],
  },
  bookmarks: ?(BookmarkType[]),
  close: void => void,
  onClickNavigate: BookmarkType => void,
};

const ModalBookmarks = (props: Props) => (
  <Modal close={props.close}>
    <h1>
      {props.bookmarks && props.bookmarks.length > 0
        ? 'Bookmarks'
        : 'No bookmarks'}
    </h1>
    {props.bookmarks &&
      props.bookmarks.map(({ ride, camera, image }) => (
        <Bookmark
          key={`${ride}${camera}${image}`}
          ride={ride}
          camera={camera}
          // $FlowFixMe
          image={props.images[camera][image]}
          onClick={() => props.onClickNavigate({ ride, camera, image })}
        />
      ))}
  </Modal>
);

export default ModalBookmarks;
