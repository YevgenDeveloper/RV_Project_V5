// @flow

import React from 'react';

import { Button } from 'client/components';
import styles from './styles.css';

type Props = {
  calibrated?: boolean,
  distance?: number,
  onClickClose: void => void,
};

const Toolbar = (props: Props) => (
  <div className={styles.toolbar}>
    <div className={styles.distance}>
      {props.calibrated && props.distance
        ? `Distance ${props.distance} m`
        : 'Draw the line between two rails'}
    </div>
    <Button
      dark
      label="Close"
      className={styles.button}
      onClick={() => props.onClickClose()}
    />
  </div>
);

Toolbar.defaultProps = {
  calibrated: false,
  distance: 0,
};

export default Toolbar;
