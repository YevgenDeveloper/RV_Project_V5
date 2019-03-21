// @flow

import React from 'react';

import { Modal, Button } from 'client/components';
import styles from './styles.css';

type Props = {
  aliases: string[],
  close: void => void,
};

const ModalAliases = (props: Props) => (
  <Modal close={props.close}>
    <div className={styles.header}>
      <h1>Aliases</h1>
      <div className={styles.buttonAdd}>
        <Button
          blue
          label="Add Alias"
          className={styles.button}
          onClick={() => {}}
        />
        <input type="text" />
      </div>
    </div>
    <div className={styles.aliases}>
      {props.aliases.map(ride => (
        <div>{ride}</div>
      ))}
    </div>
  </Modal>
);

export default ModalAliases;
