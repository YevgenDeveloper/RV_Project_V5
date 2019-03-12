// @flow

import React, { Component, Fragment } from 'react';

import { getStartCoords } from 'client/services';
import { drawTools } from 'client/constants';
import { LoaderSpinner } from 'client/components';
import Toolbar from './Toolbar';
import * as draw from './draw';
import styles from './styles.css';

type Props = {
  drawTool: string,
  drawColor: string,
  drawLineWidth: number,
  drawFontsize: string,
  onChangeTool: ({ drawTool: string }) => void,
  onClickSave: string => void,
  onClickClose: void => void,
  imageUrl?: string,
};

type State = {
  width: number,
  height: number,
  storedUndo: Object[],
  storedItems: Object[],
  isText: boolean,
  text: string,
  textStyles: {},
};

export default class Annotation extends Component<Props, State> {
  image = new Image();

  static defaultProps = {
    imageUrl: undefined,
  };

  state = {
    width: 0,
    height: 0,
    storedUndo: [],
    storedItems: [],
    isText: false,
    text: '',
    textStyles: {},
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
        };
      }
      return {
        width: (clientHeight / naturalHeight) * naturalWidth,
        height: clientHeight,
      };
    }, this.redraw);
  };

  redraw = () => {
    this.base.width = this.base.width;
    this.draw.width = this.draw.width;
    this.baseCtx.clearRect(0, 0, this.base.width, this.base.height);
    this.baseCtx.drawImage(this.image, 0, 0, this.base.width, this.base.height);
    this.state.storedItems.forEach(this.redrawItem);
    this.forceUpdate();
  };

  redrawItem = (options: {
    drawTool: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    points: number[][],
    text: string,
  }) => {
    const { drawTool, x1, y1, x2, y2, points = [], text = '' } = options;
    const { drawLineWidth, drawColor, drawFontsize } = this.props;

    if (drawTool === drawTools.PEN) {
      for (let b = 0; b < points.length - 1; b += 1) {
        // $FlowFixMe
        draw.pen(this.baseCtx, {
          x1: points[b][0],
          y1: points[b][1],
          x2: points[b + 1][0],
          y2: points[b + 1][1],
          drawLineWidth,
          drawColor,
        });
      }
      return;
    }

    draw[drawTool](this.baseCtx, {
      x1,
      y1,
      x2,
      y2,
      text,
      drawLineWidth,
      drawColor,
      drawFontsize,
    });
  };

  pushText = () => {
    this.setState(
      state => ({
        isText: false,
        text: '',
        storedUndo: state.storedUndo.length > 0 ? [] : state.storedItems,
        storedItems:
          state.text.length === 0
            ? state.storedItems
            : [
                ...state.storedItems,
                {
                  drawTool: this.props.drawTool,
                  x1: this.x1,
                  y1: this.y1,
                  x2: this.x2,
                  text: state.text,
                },
              ],
      }),
      this.redraw,
    );
  };

  handleStartDraw = (event: MouseEvent) => {
    const { x, y } = getStartCoords(event, this.base);

    this.isStarted = true;

    if (this.state.isText) {
      this.pushText();
      this.redraw();
    }

    this.x1 = x;
    this.y1 = y;
    this.x2 = null;
    this.y2 = null;
    this.points = [];

    if (this.props.drawTool === drawTools.PEN) {
      this.points.push([this.x1, this.y1]);
    }

    if (this.props.drawTool === drawTools.TEXT) {
      this.setState({
        isText: true,
        textStyles: {
          color: this.props.drawColor,
          fontSize: this.props.drawFontsize,
          left: `${this.x1 + 2}px`,
          top: `${this.y1}px`,
          width: 0,
          height: 0,
        },
      });
    }
  };

  handleMouseMove = (event: MouseEvent) => {
    const { drawTool, drawLineWidth, drawColor } = this.props;
    const { x1, y1, drawCtx, isStarted } = this;

    if (drawTool) {
      event.preventDefault();
    }

    if (!isStarted) {
      return;
    }

    const { top, left, pageX, pageY } = getStartCoords(event, this.base);

    switch (drawTool) {
      case drawTools.RECTANGLE:
        this.draw.width = this.draw.width;

        // $FlowFixMe
        this.x2 = pageX - left - x1;

        // $FlowFixMe
        this.y2 = pageY - top - y1;

        // $FlowFixMe
        draw.rectangle(drawCtx, {
          x1,
          y1,
          x2: this.x2,
          y2: this.y2,
          drawLineWidth,
          drawColor,
        });
        break;

      case drawTools.CIRCLE:
      case drawTools.ARROW:
        this.draw.width = this.draw.width;
        this.x2 = pageX - left;
        this.y2 = pageY - top;
        draw[drawTool](drawCtx, {
          x1,
          y1,
          x2: this.x2,
          y2: this.y2,
          drawLineWidth,
          drawColor,
        });
        break;

      case drawTools.PEN:
        this.x1 = this.points[this.points.length - 1][0];
        this.y1 = this.points[this.points.length - 1][1];
        this.x2 = pageX - left;
        this.y2 = pageY - top;
        this.points.push([this.x2, this.y2]);

        // $FlowFixMe
        draw[drawTool](drawCtx, {
          x1: this.x1,
          y1: this.y1,
          x2: this.x2,
          y2: this.y2,
          drawLineWidth,
          drawColor,
        });
        break;

      case drawTools.TEXT:
        this.draw.width = this.draw.width;

        // $FlowFixMe
        this.x2 = pageX - this.x1;

        // $FlowFixMe
        this.y2 = pageY - this.y1;

        this.setState(state => ({
          textStyles: {
            ...state.textStyles,
            left: `${this.x1 + 2}px`,
            // $FlowFixMe
            top: `${this.y1}px`,
            // $FlowFixMe
            width: `${this.x2 - 12}px`,
            // $FlowFixMe
            height: `${this.y2}px`,
          },
        }));
        break;

      default:
    }
  };

  handleStopDraw = () => {
    const { drawTool } = this.props;
    const { x1, y1, x2, y2, points } = this;

    this.isStarted = false;

    if (y2 === null || x2 === null) {
      return;
    }

    if (drawTool === drawTools.TEXT) {
      return;
    }

    this.setState(
      state => ({
        storedUndo: state.storedUndo.length > 0 ? [] : state.storedUndo,
        storedItems: [
          ...state.storedItems,
          { drawTool, x1, y1, x2, y2, points },
        ],
      }),
      this.redraw,
    );

    this.points = [];
  };

  handleMouseLeave = () => {
    if (this.isStarted) {
      this.handleStopDraw();
    }
  };

  handleUndo = () => {
    this.setState(
      ({ storedUndo, storedItems }) => {
        storedUndo.push(storedItems[storedItems.length - 1]);
        storedItems.pop();
        return { storedItems, storedUndo };
      },
      () => {
        this.draw.width = this.draw.width;
        this.redraw();
      },
    );
  };

  handleRedo = () => {
    this.setState(
      ({ storedUndo, storedItems }) => {
        storedItems.push(storedUndo[storedUndo.length - 1]);
        storedUndo.pop();
        return { storedItems, storedUndo };
      },
      () => {
        this.draw.width = this.draw.width;
        this.redraw();
      },
    );
  };

  isStarted: boolean;

  canvas: HTMLDivElement;

  base: HTMLCanvasElement;

  baseCtx: CanvasRenderingContext2D;

  draw: HTMLCanvasElement;

  drawCtx: CanvasRenderingContext2D;

  x1: ?number;

  x2: ?number;

  y1: ?number;

  y2: ?number;

  points: number[][];

  render() {
    return (
      <div className={styles.container}>
        <Toolbar
          drawTool={this.props.drawTool}
          drawTools={drawTools}
          disabledUndo={this.state.storedItems.length === 0}
          disabledRedo={this.state.storedUndo.length === 0}
          disabledSave={!this.props.imageUrl}
          onChangeTool={this.props.onChangeTool}
          onClickUndo={this.handleUndo}
          onClickRedo={this.handleRedo}
          onClickClose={this.props.onClickClose}
          onClickSave={() =>
            this.props.onClickSave(this.base.toDataURL('image/jpeg', 0.75))
          }
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
              {this.state.isText && (
                <textarea
                  value={this.state.text}
                  onChange={(event: Event) => {
                    const { target } = event;
                    if (target instanceof HTMLTextAreaElement) {
                      this.setState({ text: target.value });
                    }
                  }}
                  onBlur={() => this.pushText()}
                  className={styles.textarea}
                  style={this.state.textStyles}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
