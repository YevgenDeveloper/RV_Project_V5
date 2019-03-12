// @flow

import type { BookmarkType } from 'client/types';

import React from 'react';

import { googleStorageUrl } from 'client/constants';
import styles from './styles.css';

type Props = BookmarkType & {
  onClick: void => void,
};

const Bookmark = (props: Props) => {
  const title = `Ride: ${props.ride}, camera: ${props.camera}`;

  return (
    <button
      type="button"
      className={styles.bookmark}
      onClick={() => props.onClick()}
    >
      <img
        alt={title}
        className={styles.image}
        src={`${googleStorageUrl}/${props.ride}/${props.camera}/${props.image}`}
      />
      <div>
        <div className={styles.info}>
          <b>Ride:</b>
          {` ${props.ride}`}
        </div>
        <div className={styles.info}>
          <b>Camera:</b>
          {` ${props.camera}`}
        </div>
      </div>
    </button>
  );
};

export default Bookmark;
