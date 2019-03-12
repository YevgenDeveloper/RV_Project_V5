// @flow
import React from 'react';
import classNames from 'classnames/bind';
import { Button } from 'client/components';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  header: string,
  text?: string,
  className?: string,
  actionLabel?: string,
  action?: void => void,
};

const Message = (props: Props) => (
  <div className={cx(styles.message, props.className)}>
    <div className={styles.inner}>
      <h1>{props.header}</h1>
      <p>{props.text}</p>
      {props.action &&
        props.actionLabel && (
          <Button
            label={props.actionLabel}
            className={styles.button}
            onClick={props.action}
          />
        )}
    </div>
  </div>
);

Message.defaultProps = {
  text: undefined,
  className: undefined,
  actionLabel: undefined,
  action: undefined,
};

export default Message;
