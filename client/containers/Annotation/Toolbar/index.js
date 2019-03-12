// @flow

import React from 'react';

import classNames from 'classnames/bind';
import { Button } from 'client/components';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  disabledSave?: boolean,
  disabledUndo?: boolean,
  disabledRedo?: boolean,
  drawTools: { [drawTool: string]: string },
  drawTool: string,
  onChangeTool: ({ drawTool: string }) => void,
  onClickUndo: void => void,
  onClickRedo: void => void,
  onClickClose: void => void,
  onClickSave: void => void,
};

const Toolbar = (props: Props) => (
  <div className={styles.toolbar}>
    <div className={styles.group}>
      <Button
        dark
        label="Undo"
        className={cx(styles.button, styles.undo, {})}
        onClick={() => props.onClickUndo()}
        disabled={props.disabledUndo}
      />
      <Button
        dark
        label="Redo"
        className={cx(styles.button, styles.redo, {})}
        onClick={() => props.onClickRedo()}
        disabled={props.disabledRedo}
      />
    </div>
    <div className={styles.group}>
      {Object.keys(props.drawTools).map(key => (
        <Button
          dark
          key={key}
          label={props.drawTools[key]}
          className={cx(styles.button, styles[props.drawTools[key]], {
            on: props.drawTool === props.drawTools[key],
          })}
          onClick={() => props.onChangeTool({ drawTool: props.drawTools[key] })}
        />
      ))}
    </div>
    <Button
      dark
      label="Cancel"
      className={cx(styles.button, styles.cancel)}
      onClick={() => props.onClickClose()}
    />
    <Button
      blue
      label="Save"
      className={styles.button}
      onClick={() => props.onClickSave()}
      disabled={props.disabledSave}
    />
  </div>
);

Toolbar.defaultProps = {
  disabledSave: false,
  disabledUndo: false,
  disabledRedo: false,
};

export default Toolbar;
