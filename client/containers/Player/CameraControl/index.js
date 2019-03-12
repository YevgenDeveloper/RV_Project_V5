// @flow

import React from 'react';
import classNames from 'classnames/bind';

import { cameras } from 'client/constants';
import { Button } from 'client/components';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  disabled: boolean,
  camera: string,
  onChangeCamera: string => void,
};

const CameraControl = (props: Props) => (
  <div className={styles.control}>
    <Button
      label="Cam 1"
      onClick={() => props.onChangeCamera(cameras.CAMERA_1)}
      className={cx(styles.button, {
        [styles.on]: !props.disabled && props.camera === cameras.CAMERA_1,
      })}
      disabled={props.disabled}
    />
    <Button
      label="Cam 2"
      onClick={() => props.onChangeCamera(cameras.CAMERA_2)}
      className={cx(styles.button, {
        [styles.on]: !props.disabled && props.camera === cameras.CAMERA_2,
      })}
      disabled={props.disabled}
    />
    <Button
      label="Cam 3"
      onClick={() => props.onChangeCamera(cameras.CAMERA_3)}
      className={cx(styles.button, {
        [styles.on]: !props.disabled && props.camera === cameras.CAMERA_3,
      })}
      disabled={props.disabled}
    />
    <Button
      label="Cam 4"
      onClick={() => props.onChangeCamera(cameras.CAMERA_4)}
      className={cx(styles.button, {
        [styles.on]: !props.disabled && props.camera === cameras.CAMERA_4,
      })}
      disabled={props.disabled}
    />
  </div>
);

export default CameraControl;
