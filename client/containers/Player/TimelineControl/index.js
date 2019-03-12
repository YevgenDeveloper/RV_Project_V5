// @flow

import React, { Component } from 'react';

import styles from './styles.css';

type Props = {
  currentImage: number,
  totalImages: number,
  disabled: boolean,
  onChangeImage: number => void,
};

type State = {
  totalImages: number,
  pixelsPerFrame: number,
  currentImage: number,
  sliderPosition: number,
};

export default class TimelineControl extends Component<Props, State> {
  state = {
    totalImages: 0,
    pixelsPerFrame: 1,
    // eslint-disable-next-line
    currentImage: 0,
    sliderPosition: 0,
  };

  componentDidMount() {
    document.addEventListener('resize', this.updateSlider);
    this.updateSlider();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevProps.currentImage !== this.props.currentImage ||
      prevState.totalImages !== this.state.totalImages
    ) {
      this.updateSlider();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.updateSlider);
  }

  static getDerivedStateFromProps(nextProps: Props) {
    return {
      currentImage: nextProps.currentImage,
      totalImages: nextProps.totalImages,
    };
  }

  updateSlider = () => {
    this.setState(state => {
      if (!state.totalImages) {
        return null;
      }

      const pixelsPerFrame = this.ref.offsetWidth / state.totalImages;

      return {
        pixelsPerFrame,
        sliderPosition: state.currentImage * pixelsPerFrame,
      };
    });
  };

  handleClick = (event: MouseEvent) => {
    const { left } = this.ref.getBoundingClientRect();
    const sliderPosition = event.pageX - left;

    this.setState({ sliderPosition }, () => {
      this.props.onChangeImage(
        Math.round(sliderPosition / this.state.pixelsPerFrame),
      );
    });
  };

  ref: HTMLButtonElement;

  render() {
    const { sliderPosition } = this.state;

    return (
      <button
        type="button"
        ref={ref => {
          if (ref) this.ref = ref;
        }}
        className={styles.timeline}
        onClick={this.handleClick}
        disabled={this.props.disabled}
      >
        <div
          className={styles.path}
          style={{ width: `${sliderPosition > 4 ? sliderPosition - 4 : 0}px` }}
        />
        <div
          className={styles.slider}
          style={{ transform: `translateX(${sliderPosition}px)` }}
        />
      </button>
    );
  }
}
