// @flow

import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  icon?: boolean,
  className?: string,
};

const Logo = (props: Props) => (
  <div
    className={cx(styles.logo, props.className, {
      [styles.icon]: props.icon,
    })}
  />
);

Logo.defaultProps = {
  icon: false,
  className: undefined,
};

export default Logo;
