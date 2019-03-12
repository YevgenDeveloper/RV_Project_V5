// @flow

import React, { Component, Fragment } from 'react';

import { getStartCoords } from 'client/services';
import { LoaderSpinner } from 'client/components';
import Toolbar from './Toolbar';
import draw from './draw';
import styles from './styles.css';

const BASE_DISTANCE = 1.45;

type Props = {
  onClickClose: void => void,
  imageUrl?: string,
};

type State = {
  width: number,
  height: number,
  baseX: ?number,
  baseX2: ?number,
  baseY: ?number,
  baseDistance: ?number,
  distance: number,
};

export default class Measurement extends Component<Props, State> {
  image = new Image();

  static defaultProps = {
    imageUrl: undefined,
  };

  state = {
    width: 0,
    height: 0,
    baseX: undefined,
    baseX2: undefined,
    baseY: undefined,
    baseDistance: undefined,
    distance: 0,
  };

  componentDidMount() {
    if (this.props.imageUrl) {
      this.initCanvas();
    }

    document.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.imageUrl && this.props.imageUrl) {
      this.initCanvas();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.handleResize);

    if (this.draw) {
      // $FlowFixMe
      this.draw.removeEventListener('mousedown', this.handleStartDraw);
      this.draw.removeEventListener('mouseup', this.handleStopDraw);

      // $FlowFixMe
      this.draw.removeEventListener('touchstart', this.handleStartDraw);
      this.draw.removeEventListener('touchend', this.handleStopDraw);
      this.draw.removeEventListener('mouseleave', this.handleMouseLeave);
      this.draw.removeEventListener('mousemove', this.handleMouseMove);
      this.draw.removeEventListener('touchleave', this.handleMouseLeave);

      // $FlowFixMe
      this.draw.removeEventListener('touchmove', this.handleMouseMove);
    }
  }

  initCanvas = () => {
    this.image.crossOrigin = 'anonymous';
    this.image.src = this.props.imageUrl || '';
    this.image.onload = this.handleResize;

    this.baseCtx = this.base.getContext('2d');
    this.baseCtx.lineJoin = 'round';
    this.drawCtx = this.draw.getContext('2d');
    this.drawCtx.lineJoin = 'round';

    // $FlowFixMe
    this.draw.addEventListener('mousedown', this.handleStartDraw);

    this.draw.addEventListener('mouseup', this.handleStopDraw);

    // $FlowFixMe
    this.draw.addEventListener('touchstart', this.handleStartDraw);
    this.draw.addEventListener('touchend', this.handleStopDraw);
    this.draw.addEventListener('mouseleave', this.handleMouseLeave);
    this.draw.addEventListener('mousemove', this.handleMouseMove);
    this.draw.addEventListener('touchleave', this.handleMouseLeave);

    // $FlowFixMe
    this.draw.addEventListener('touchmove', this.handleMouseMove);
  };

  handleResize = () => {
    if (!this.props.imageUrl || !this.canvas || !this.base || !this.draw) {
      return;
    }

    this.setState(() => {
      const { clientWidth, clientHeight } = this.canvas;
      const { naturalWidth, naturalHeight } = this.image;

      if (naturalWidth > naturalHeight) {
        return {
          width: clientWidth,
          height: (clientWidth / naturalWidth) * naturalHeight,
          baseDistance: undefined,
          distance: 0,
        };
      }
      return {
        width: (clientHeight / naturalHeight) * naturalWidth,
        height: clientHeight,
        baseDistance: undefined,
        distance: 0,
      };
    }, this.redraw);
  };

  redraw = () => {
    this.base.width = this.base.width;
    this.draw.width = this.draw.width;
    this.baseCtx.clearRect(0, 0, this.base.width, this.base.height);
    this.baseCtx.drawImage(this.image, 0, 0, this.base.width, this.base.height);
    this.forceUpdate();
  };

  handleStartDraw = (event: MouseEvent) => {
    const { x, y } = getStartCoords(event, this.base);

    this.isStarted = true;
    this.x = x;
    this.y = y;
    this.x2 = undefined;
  };

  handleMouseMove = (event: MouseEvent) => {
    if (!this.isStarted) {
      return;
    }

    event.preventDefault();

    const { left, pageX } = getStartCoords(event, this.base);

    this.draw.width = this.draw.width;
    this.x2 = pageX - left;

    if (this.state.baseDistance === undefined) {
      // $FlowFixMe
      draw(this.drawCtx, { x: this.x, y: this.y, x2: this.x2, color: 'white' });
    } else {
      // $FlowFixMe
      this.x = this.state.baseX + this.state.baseDistance / 2;

      // $FlowFixMe
      draw(this.drawCtx, {
        x: this.state.baseX,
        y: this.state.baseY,
        x2: this.state.baseX2,
        color: 'white',
      });

      // $FlowFixMe
      draw(this.drawCtx, {
        x: this.x,
        y: this.state.baseY,
        x2: this.x2,
        color: 'red',
      });
      // $FlowFixMe
      this.setState({ distance: Math.abs(this.x - this.x2) });
    }
  };

  handleStopDraw = () => {
    if (this.state.baseDistance === undefined && this.isStarted) {
      this.setState({
        baseX: this.x,
        baseY: this.y,
        baseX2: this.x2,
        // $FlowFixMe
        baseDistance: Math.abs(this.x - this.x2),
      });
    }

    if (this.state.baseDistance) {
      this.isStarted = !this.isStarted;
    }
  };

  handleMouseLeave = () => {
    if (this.isStarted) {
      this.handleStopDraw();
    }
  };

  isStarted: boolean;

  canvas: HTMLDivElement;

  base: HTMLCanvasElement;

  baseCtx: CanvasRenderingContext2D;

  draw: HTMLCanvasElement;

  drawCtx: CanvasRenderingContext2D;

  x: ?number;

  x2: ?number;

  y: ?number;

  render() {
    const distance =
      Math.round(
        (BASE_DISTANCE / (this.state.baseDistance || 1)) *
          this.state.distance *
          100,
      ) / 100;

    return (
      <div className={styles.container}>
        <Toolbar
          calibrated={this.state.baseDistance !== undefined}
          distance={distance}
          onClickClose={() => this.props.onClickClose()}
        />
        <div
          className={styles.canvas}
          ref={ref => {
            if (ref) this.canvas = ref;
          }}
        >
          {!this.props.imageUrl ? (
            <LoaderSpinner className={styles.loader} />
          ) : (
            <Fragment>
              <canvas
                ref={ref => {
                  if (ref) this.base = ref;
                }}
                className={styles.base}
                width={this.state.width}
                height={this.state.height}
              />
              <canvas
                ref={ref => {
                  if (ref) this.draw = ref;
                }}
                className={styles.draw}
                width={this.state.width}
                height={this.state.height}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
