// @flow

import type { StateType, ActionType } from 'client/types';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';

import { logout } from 'client/services';
import { modals } from 'client/constants';
import { Button, Logo, Toolbar } from 'client/components';
import * as actions from 'client/store/actions';
import styles from './styles.css';

const cx = classNames.bind(styles);

const handleLogout = () => {
  logout();
  setTimeout(() => window.location.reload(), 1000);
};

type Props = StateType & ActionType;

const Navbar = (props: Props) => {
  const isBookmarked =
    props.bookmarks.findIndex(
      b =>
        b.ride === props.currentRide &&
        b.camera === props.players[0].camera &&
        b.image === props.players[0].currentImage,
    ) > -1;

  return (
    <div className={styles.navbar}>
      <div className={styles.box}>
        <Logo />
      </div>
      <Toolbar
        currentView={props.view}
        currentRide={props.currentRide}
        changeView={props.changeView}
        onClickAnnotation={props.annotate}
        onClickMeasurement={props.measurement}
        onClickDownload={props.downloadImage}
        onClickBookmark={props.toogleBookmark}
        onClickRide={() => props.toggleModal(modals.RIDES)}
        isBookmarked={isBookmarked}
        disabled={props.isLoading}
      />
      <div className={styles.box}>
        <Button
          label="Help"
          className={cx(styles.button, styles.help)}
          onClick={() => {
            window.location.href = 'assets/railview-help.pdf';
          }}
        />
        <Button
          label="Bookmarks"
          className={cx(styles.button, styles.bookmarks)}
          onClick={() => props.toggleModal(modals.BOOKMARKS)}
          disabled={props.isLoading}
        />
        <Button
          label="Logout"
          className={cx(styles.button, styles.logout)}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

// $FlowFixMe
export default connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch),
)(Navbar);
