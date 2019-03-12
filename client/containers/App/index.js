// @flow

import type { StateType, ActionType } from 'client/types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { purgeStoredState } from 'redux-persist';

import { persistConfig } from 'client/store/persist';
import { views, modals } from 'client/constants';
import { getImageUrl } from 'client/services';
import {
  Annotation,
  Measurement,
  ModalRides,
  ModalBookmarks,
  ModalWhatsNew,
  Player,
  ModalSaveAnnotation,
} from 'client/containers';
import { ErrorMessage, Navbar, Notification } from 'client/components';
import * as actions from 'client/store/actions';
import styles from './styles.css';

type Props = StateType & ActionType;

type State = {
  errorMessage: ?string,
};

@connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch),
)
class App extends Component<Props, State> {
  timeout = null;

  state = {
    errorMessage: undefined,
  };

  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  get modal() {
    switch (this.props.modal) {
      case modals.RIDES:
        return (
          <ModalRides
            rides={this.props.rides}
            currentRide={this.props.currentRide}
            onChangeRide={this.props.changeRide}
            close={this.props.toggleModal}
          />
        );

      case modals.BOOKMARKS:
        return (
          <ModalBookmarks
            close={this.props.toggleModal}
            bookmarks={this.props.bookmarks}
            images={this.props.images}
            onClickRemove={this.props.toogleBookmark}
            onClickNavigate={this.props.navigate}
          />
        );

      case modals.SAVE_ANNOTATION:
        return (
          <ModalSaveAnnotation
            image={this.props.annotationImage}
            onClickSave={this.props.saveAnnotation}
            close={this.props.toggleModal}
          />
        );

      case modals.WHATS_NEW:
        return (
          <ModalWhatsNew
            close={this.props.toggleModal}
            whatsnew={this.props.whatsnew}
          />
        );

      default:
        return null;
    }
  }

  get view() {
    const {
      view,
      currentRide,
      players,
      images,
      updatePlayer,
      isLoading,
    } = this.props;

    const imageName = images[players[0].camera][players[0].currentImage];
    const imageUrl = imageName
      ? getImageUrl(currentRide, players[0].camera, imageName)
      : undefined;

    switch (view) {
      case views.ANNOTATION:
        return (
          <Annotation
            imageUrl={imageUrl}
            drawTool={this.props.drawTool}
            drawColor={this.props.drawColor}
            drawLineWidth={this.props.drawLineWidth}
            drawFontsize={this.props.drawFontsize}
            onChangeTool={this.props.changeAnnotationTool}
            onClickSave={this.props.openSaveAnnotation}
            onClickClose={this.props.changeView}
          />
        );

      case views.MEASUREMENT:
        return (
          <Measurement
            imageUrl={imageUrl}
            onClickClose={this.props.changeView}
          />
        );

      case views.COMPARISON:
        return (
          <div className={styles.splitView}>
            <Player
              currentRide={currentRide}
              player={players[0]}
              images={images[players[0].camera]}
              update={payload => updatePlayer(0, payload)}
              isLoading={isLoading}
            />
            <Player
              currentRide={currentRide}
              player={players[1]}
              images={images[players[1].camera]}
              update={payload => updatePlayer(1, payload)}
              isLoading={isLoading}
            />
          </div>
        );

      default:
        return (
          <Player
            currentRide={currentRide}
            player={players[0]}
            images={images[players[0].camera]}
            update={payload => updatePlayer(0, payload)}
            isLoading={isLoading}
          />
        );
    }
  }

  handleReload = () => {
    purgeStoredState(persistConfig);
    window.location.reload();
  };

  // $FlowFixMe
  componentDidCatch(error: Error, info: string) {
    this.setState({ errorMessage: info });
  }

  timeout: TimeoutID;

  render() {
    const error = this.props.errorMessage || this.state.errorMessage;

    if (error) {
      return (
        <ErrorMessage
          header="Sorry, there was an error"
          text={error}
          actionLabel="Reload"
          action={this.handleReload}
        />
      );
    }

    return (
      <div className={styles.container}>
        <Navbar />
        {this.view}
        {this.modal}
        {this.props.notification && (
          <Notification
            text={this.props.notification}
            close={this.props.toggleNotification}
          />
        )}
      </div>
    );
  }
}

export default App;
