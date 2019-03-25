// @flow

import React, { Component } from 'react';

import { Modal, Button } from 'client/components';
import styles from './styles.css';

class ModalAlliases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handelChange = event => {
    const state = Object.assign({}, this.state);

    state.value = event.target.value;

    this.setState(state);
  };

  handleSubmit = () => {
    const { addAlias } = this.props;
    const { value } = this.state;

    addAlias(value);
  };

  render() {
    const { close, aliases } = this.props;
    return (
      <Modal close={close}>
        <div className={styles.header}>
          <h1>Aliases</h1>
          <div className={styles.buttonAdd}>
            <Button
              blue
              label="Add Alias"
              className={styles.button}
              onClick={this.handleSubmit}
            />
            <input
              type="text"
              className={styles.input}
              onChange={this.handelChange}
              value={this.state.value}
            />
          </div>
        </div>
        <div className={styles.aliases}>
          {aliases.map(alias => (
            <div className={styles.alias}>{alias}</div>
          ))}
        </div>
      </Modal>
    );
  }
}
export default ModalAlliases;
