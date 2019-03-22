// @flow

import React, { Component } from 'react';

import { Modal, Button } from 'client/components';
import styles from './styles.css';

// type Props = {
//   aliases: string[],
//   close: void => void,
// };
//
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

    console.log(addAlias, typeof addAlias, this.props);

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
              onChange={this.handelChange}
              value={this.state.value}
            />
          </div>
        </div>
        <div className={styles.aliases}>
          {aliases.map(ride => (
            <div>{ride}</div>
          ))}
        </div>
      </Modal>
    );
  }
}
export default ModalAlliases;
// export default function ModalAliases(props) {
//   console.log(props);
//
//   value = '';
//
//   const handleSubmit = event => {
//     console.log(event.target.value);
//   };
//
//   const handleOnChange = event => {
//     value = event.target.value;
//   };
//   return (
//     <Modal close={props.close}>
//       <div className={styles.header}>
//         <h1>Aliases</h1>
//         <div className={styles.buttonAdd}>
//           <Button
//             blue
//             label="Add Alias"
//             className={styles.button}
//             onClick={handleSubmit}
//           />
//           <input type="text" onChange={handleOnChange} />
//         </div>
//       </div>
//       <div className={styles.aliases}>
//         {props.aliases.map(ride => (
//           <div>{ride}</div>
//         ))}
//       </div>
//     </Modal>
//   );
// }
