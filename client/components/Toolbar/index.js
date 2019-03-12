// @flow

import React from 'react';
import classNames from 'classnames/bind';

import { views } from 'client/constants';
import { Button } from 'client/components';
import styles from './styles.css';

const cx = classNames.bind(styles);

type Props = {
  isBookmarked: boolean,
  disabled: boolean,
  currentRide: string,
  currentView?: string,
  changeView: string => void,
  onClickAnnotation: void => void,
  onClickDownload: void => void,
  onClickBookmark: void => void,
  onClickRide: void => void,
};

const Toolbar = (props: Props) => (
  <div className={styles.toolbar}>
    <Button
      label={`Ride: ${props.currentRide}`}
      className={cx(styles.button, styles.ride)}
      onClick={props.onClickRide}
      disabled={props.disabled}
    />
    <Button
      label="Annotation"
      className={cx(styles.button, styles.annotation, {
        [styles.on]: props.currentView === views.ANNOTATION,
      })}
      onClick={() => props.onClickAnnotation()}
      disabled={props.disabled}
    />
    <Button
      label="Comparison"
      className={cx(styles.button, styles.comparison, {
        [styles.on]: props.currentView === views.COMPARISON,
      })}
      onClick={() => props.changeView(views.COMPARISON)}
      on={props.currentView === views.COMPARISON}
      disabled={props.disabled}
    />
    <Button
      label="Measurement"
      className={cx(styles.button, styles.measurement, {
        [styles.on]: props.currentView === views.MEASUREMENT,
      })}
      onClick={() => props.changeView(views.MEASUREMENT)}
      on={props.currentView === views.MEASUREMENT}
      disabled={props.disabled}
    />
    <Button
      label="Download"
      className={cx(styles.button, styles.download)}
      onClick={() => props.onClickDownload()}
      disabled={props.disabled}
    />
    <Button
      label="Bookmark"
      className={cx(styles.button, styles.bookmark, {
        [styles.bookmarked]: props.isBookmarked,
      })}
      onClick={() => props.onClickBookmark()}
      disabled={props.disabled}
    />
  </div>
);

Toolbar.defaultProps = {
  currentView: undefined,
};

export default Toolbar;
