// @flow

import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  disabled?: boolean,
  value: string,
  type?: string,
  placeholder?: string,
  className?: string,
  onChange: string => void,
};

const Input = (props: Props) => (
  <input
    type={props.type}
    value={props.value}
    placeholder={props.placeholder}
    className={cx(styles.input, props.className)}
    onChange={(event: Event) => {
      const { target } = event;
      if (target instanceof HTMLInputElement) {
        props.onChange(target.value);
      }
    }}
    disabled={props.disabled}
  />
);

Input.defaultProps = {
  type: 'text',
  placeholder: undefined,
  className: undefined,
  disabled: false,
};

export default Input;
