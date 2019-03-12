// @flow

import type { PlayerType } from 'client/types';

import React, { Component } from 'react';

import { playModes } from 'client/constants';
import { getImageUrl } from 'client/services';
import { LoaderSpinner } from 'client/components';
import CameraControl from './CameraControl';
import PlaybackControl from './PlaybackControl';
import TimelineControl from './TimelineControl';
import styles from './styles.css';

type Props = {
  isLoading: boolean,
  currentRide: string,
  images: string[],
  player: PlayerType,
  update: ({}) => void,
};

type State = {
  totalImages: number,
  currentImage: number,
};

export default class Player extends Component<Props, State> {
  state = {
    totalImages: 0,
    currentImage: this.props.player ? this.props.player.currentImage : 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.player.currentImage !== this.props.player.currentImage) {
      this.handleChangeImage(this.props.player.currentImage);
    }

    if (prevProps.player.playMode !== this.props.player.playMode) {
      this.updateImage();
    }
  }

  static getDerivedStateFromProps(props: Props) {
    return {
      totalImages: props.images ? props.images.length : 0,
    };
  }

  getImageUrl = () => {
    const { player, images, currentRide } = this.props;
    const { currentImage } = this.state;

    if (!images || !images[currentImage]) {
      return undefined;
    }

    return getImageUrl(currentRide, player.camera, images[currentImage]);
  };

  handleChangePlayMode = (playMode: string) => {
    this.props.update({
      playMode:
        playMode === this.props.player.playMode ? playModes.PAUSE : playMode,
    });
  };

  handleChangeImage = (currentImage: number) => {
    this.setState({ currentImage });
    this.props.update({ currentImage });
  };

  updateImage = () => {
    const { playMode } = this.props.player;
    const { currentImage, totalImages } = this.state;

    if (
      playMode === playModes.PAUSE ||
      this.props.isLoading ||
      (playMode === playModes.FORWARD && currentImage === totalImages) ||
      (playMode === playModes.BACKWARD && currentImage === 0)
    ) {
      this.props.update({
        playMode: playModes.PAUSE,
        currentImage,
      });
      return;
    }

    this.setState(state => ({
      currentImage:
        playMode === playModes.FORWARD
          ? state.currentImage + 1
          : state.currentImage - 1,
    }));
  };

  render() {
    const { isLoading, player } = this.props;

    return (
      <div className={styles.player}>
        <div className={styles.controls}>
          <CameraControl
            camera={player.camera}
            onChangeCamera={(camera: string) => this.props.update({ camera })}
            disabled={this.props.isLoading}
          />
          <PlaybackControl
            playMode={player.playMode}
            onClickPlayBack={() =>
              this.handleChangePlayMode(playModes.BACKWARD)
            }
            onClickPlayForward={() =>
              this.handleChangePlayMode(playModes.FORWARD)
            }
            disabledBack={this.state.currentImage === 0}
            disabledForward={this.state.currentImage === this.state.totalImages}
            disabled={this.props.isLoading}
          />
          <TimelineControl
            currentImage={this.state.currentImage}
            totalImages={this.state.totalImages}
            onChangeImage={this.handleChangeImage}
            disabled={this.props.isLoading}
          />
        </div>
        <button
          type="button"
          className={styles.preview}
          onClick={() => this.handleChangePlayMode(playModes.FORWARD)}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <img
              alt=""
              className={styles.image}
              src={this.getImageUrl()}
              onLoad={this.updateImage}
              onError={() => console.error('Error loading image')}
            />
          )}
        </button>
      </div>
    );
  }
}
