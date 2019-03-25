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
  currentUser: string,
};

export default class Login extends Component<{}, State> {
  timeout = null;

  state = {
    email: '',
    password: '',
    isRequest: true,
    errorMessage: '',
    currentUser: '',
  };

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ isRequest: false }), 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handelChange = (key, value) => {
    const state = Object.assign({}, this.state);

    state[key] = value;

    this.setState(state);
  };

  // handleRequest = () => {
  //   this.setState({ isRequest: true });
  //
  //   login();
  //
  //   this.timeout = setTimeout(() => window.location.reload(), 1500);
  // };

  handleSubmit = () => {
    // this.setState({ isRequest: true });
    const value = this.state;
    login(value);
    this.setState({ currentUser: 'test' });
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
            onChange={event => this.handelChange('email', event)}
            disabled={isRequest}
          />
          <Input
            type="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={event => this.handelChange('password', event)}
            disabled={isRequest}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <Button
            blue
            label="Submit"
            className={styles.buttonSumit}
            onClick={this.handleSubmit}
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
