// @flow

import type { Node } from 'react';

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  className?: string,
  close: void => void,
  children?: Node,
};

export default class Modal extends Component<Props, {}> {
  static defaultProps = {
    className: undefined,
    children: null,
  };

  componentDidMount() {
    const { body } = window.document;

    if (body) {
      body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    const { body } = window.document;

    if (body) {
      body.style.overflow = 'auto';
    }
  }

  render() {
    return (
      <div className={cx(styles.modal, this.props.className)}>
        <button
          type="button"
          className={styles.fade}
          onClick={() => this.props.close()}
          title="Close modal"
          aria-label="Close modal"
        />
        <div className={styles.body}>
          <button
            type="button"
            className={styles.close}
            onClick={() => this.props.close()}
            title="Close modal"
            aria-label="Close modal"
          />
          <Scrollbars
            autoHeight
            autoHeightMin={80}
            autoHeightMax="calc(100vh - 120px)"
          >
            <div className={styles.content}>{this.props.children}</div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
