// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';

import { Button, Input, Logo } from 'client/components';
import { login } from 'client/services';
import styles from './styles.css';

const YEAR = new Date().getFullYear();
const VERSION = '0.0.1';

const cx = classNames.bind(styles);

type State = {
  email: string,
  password: string,
  isRequest: boolean,
  errorMessage: string,
};

export default class Login extends Component<{}, State> {
  timeout = null;

  state = {
    email: '',
    password: '',
    isRequest: true,
    errorMessage: '',
  };

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ isRequest: false }), 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleRequest = () => {
    this.setState({ isRequest: true });

    login();

    this.timeout = setTimeout(() => window.location.reload(), 1500);
  };

  timeout: TimeoutID;

  render() {
    const { isRequest, errorMessage } = this.state;

    return (
      <div className={cx(styles.container, { [styles.request]: isRequest })}>
        <div className={styles.inner}>
          <Logo icon />
          <Input
            type="email"
            value={this.state.email}
            placeholder="Enter email"
            onChange={(email: string) => this.setState({ email })}
            disabled={isRequest}
          />
          <Input
            type="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={(password: string) => this.setState({ password })}
            disabled={isRequest}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <Button
            blue
            label="Submit"
            className={styles.buttonSumit}
            onClick={this.handleRequest}
            disabled={isRequest}
          />
          <div className={styles.footer}>
            {`© ${YEAR} RailView ver. ${VERSION}`}
            <br />
            Powered by
            <a
              href="http://seeitall.nl/"
              className={styles.logoSeeItAll}
              rel="noopener noreferrer"
              target="_blank"
            >
              See IT all
            </a>
          </div>
        </div>
      </div>
    );
  }
}
