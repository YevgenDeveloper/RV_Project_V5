// @flow
import React from 'react';

import { Modal, Button } from 'client/components';
import styles from './styles.css';

type Props = {
  whatsnew?: string[],
  close: void => void,
};

const ModalWhatsNew = (props: Props) => (
  <Modal close={props.close}>
    <h1>What’s new</h1>
    {props.whatsnew &&
      props.whatsnew.map((string, index) => (
        /* eslint-disable react/no-array-index-key */
        <p key={index}>{string}</p>
      ))}
    <Button
      blue
      label="Continue"
      onClick={() => props.close()}
      className={styles.button}
    />
  </Modal>
);

ModalWhatsNew.defaultProps = {
  whatsnew: [],
};

export default ModalWhatsNew;
