// @flow

import React from 'react';
import classnames from 'classnames/bind';

import { Modal, Button } from 'client/components';
import styles from './styles.css';

const cx = classnames.bind(styles);

type Props = {
  rides: string[],
  currentRide: string,
  close: void => void,
  onChangeRide: (ride: string) => void,
};

const ModalRides = (props: Props) => (
  <Modal close={props.close}>
    <div className={styles.header}>
      <h1>Rides</h1>
      <div className={styles.buttonAdd}>
        <Button
          blue
          label="Add ride"
          className={styles.button}
          onClick={() => {}}
        />
        <input type="file" />
      </div>
    </div>
    <div className={styles.rides}>
      {props.rides.map(ride => (
        <button
          key={ride}
          type="button"
          className={cx(styles.ride, {
            [styles.on]: ride === props.currentRide,
          })}
          onClick={() => props.onChangeRide(ride)}
        >
          {ride}
        </button>
      ))}
    </div>
  </Modal>
);

export default ModalRides;
