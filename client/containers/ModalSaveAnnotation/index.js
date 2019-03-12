/**
 * App > Containers > ModalSaveAnnotation
 */
import React from 'react';

import { Modal, Button } from 'client/components';
import styles from './styles.css';

type Props = {
  image: string,
  onClickSave: void => void,
  close: void => void,
};

const ModalSaveAnnotation = (props: Props) => (
  <Modal close={props.close}>
    <h1>Save annotation</h1>
    <img alt="" className={styles.image} src={props.image} />
    <div className={styles.buttons}>
      <Button
        label="Cancel"
        onClick={() => props.close()}
        className={styles.button}
      />
      <Button
        blue
        label="Save"
        onClick={() => props.onClickSave()}
        className={styles.button}
      />
    </div>
  </Modal>
);

export default ModalSaveAnnotation;
