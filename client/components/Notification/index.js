// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  delay?: number,
  text: string,
  className?: string,
  close: void => void,
};

type State = {
  isClosing: boolean,
};

export default class Notification extends Component<Props, State> {
  timeout = null;

  static defaultProps = {
    delay: 3000,
    className: undefined,
  };

  state = {
    isClosing: false,
  };

  componentDidMount() {
    this.timeout = setTimeout(this.handleClose, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClose = () => {
    this.setState({ isClosing: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.props.close, 300);
  };

  timeout: TimeoutID;

  render() {
    return (
      <button
        type="button"
        className={cx(styles.notification, this.props.className, {
          [styles.off]: this.state.isClosing,
        })}
        onClick={this.handleClose}
      >
        {this.props.text}
      </button>
    );
  }
}
