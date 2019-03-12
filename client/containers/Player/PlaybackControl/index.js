// @flow

import React from 'react';
import classNames from 'classnames/bind';

import { playModes } from 'client/constants';
import { Button } from 'client/components';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  disabledBack: boolean,
  disabledForward: boolean,
  disabled: boolean,
  playMode: string,
  onClickPlayBack: void => void,
  onClickPlayForward: void => void,
};

const PlaybackControl = (props: Props) => (
  <div className={styles.control}>
    <Button
      label="Play Back"
      onClick={props.onClickPlayBack}
      className={cx(styles.button, styles.playBack, {
        [styles.on]: props.playMode === playModes.BACKWARD,
      })}
      disabled={props.disabledBack || props.disabled}
    />
    <Button
      label="Play Forward"
      onClick={props.onClickPlayForward}
      className={cx(styles.button, styles.playForward, {
        [styles.on]: props.playMode === playModes.FORWARD,
      })}
      disabled={props.disabledForward || props.disabled}
    />
  </div>
);

export default PlaybackControl;
