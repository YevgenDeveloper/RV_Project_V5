// @flow

import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  blue?: boolean,
  dark?: boolean,
  disabled?: boolean,
  label?: string,
  className?: string,
  onClick: any => any,
};

const Button = (props: Props) => (
  <button
    type="button"
    aria-label={props.label}
    title={props.label}
    onClick={props.onClick}
    className={cx(styles.button, props.className, {
      [styles.blue]: props.blue,
      [styles.dark]: props.dark,
    })}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

Button.defaultProps = {
  label: undefined,
  className: undefined,
  blue: false,
  dark: false,
  disabled: false,
};

export default Button;
