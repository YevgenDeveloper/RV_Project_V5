// @flow

import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  className?: string,
};

const LoaderSpinner = (props: Props) => (
  <div className={cx(styles.loader, props.className)}>
    <div className={styles.loaderSpinner}>
      <svg className={styles.loaderCircular} viewBox="25 25 50 50">
        <circle
          className={styles.loaderPath}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  </div>
);

LoaderSpinner.defaultProps = {
  className: undefined,
};

export default LoaderSpinner;
