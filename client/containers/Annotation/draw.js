// @flow

type Props = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  drawLineWidth: number,
  drawColor: string,
  text: string,
  lineHeight: number,
  drawFontsize: string,
};

export function rectangle(
  ctx: CanvasRenderingContext2D,
  { x1, y1, x2, y2, drawLineWidth, drawColor }: Props,
) {
  ctx.beginPath();
  ctx.rect(x1, y1, x2, y2);
  ctx.fillStyle = 'transparent';
  ctx.fill();
  ctx.lineWidth = drawLineWidth;
  ctx.strokeStyle = drawColor;
  ctx.stroke();
}

export function circle(
  ctx: CanvasRenderingContext2D,
  { x1, y1, x2, y2, drawLineWidth, drawColor }: Props,
) {
  const radiusX = (x2 - x1) * 0.5;
  const radiusY = (y2 - y1) * 0.5;
  const centerX = x1 + radiusX;
  const centerY = y1 + radiusY;
  const step = 0.05;
  let a = step;
  const pi2 = Math.PI * 2 - step;

  ctx.beginPath();
  ctx.moveTo(centerX + radiusX * Math.cos(0), centerY + radiusY * Math.sin(0));

  for (; a < pi2; a += step) {
    ctx.lineTo(
      centerX + radiusX * Math.cos(a),
      centerY + radiusY * Math.sin(a),
    );
  }

  ctx.lineWidth = drawLineWidth;
  ctx.strokeStyle = drawColor;
  ctx.closePath();
  ctx.stroke();
}

export function arrow(
  ctx: CanvasRenderingContext2D,
  { x1, y1, x2, y2, drawLineWidth, drawColor }: Props,
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);

  ctx.beginPath();
  ctx.lineWidth = drawLineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.moveTo(
    x2 - drawLineWidth * 5 * Math.cos(angle + Math.PI / 6),
    y2 - drawLineWidth * 5 * Math.sin(angle + Math.PI / 6),
  );
  ctx.lineTo(x2, y2);
  ctx.lineTo(
    x2 - drawLineWidth * 5 * Math.cos(angle - Math.PI / 6),
    y2 - drawLineWidth * 5 * Math.sin(angle - Math.PI / 6),
  );
  ctx.strokeStyle = drawColor;
  ctx.stroke();
}

export function pen(
  ctx: CanvasRenderingContext2D,
  { x1, y1, x2, y2, drawLineWidth, drawColor }: Props,
) {
  ctx.lineWidth = drawLineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = drawColor;
  ctx.stroke();
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  {
    x1,
    y1,
    x2,
    lineHeight = 25,
    text: t,
  }: {
    x1: number,
    y1: number,
    x2: number,
    lineHeight?: number,
    text: string,
  },
) {
  const lines = t.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const words = lines[i].split(' ');
    let line = '';
    for (let n = 0; n < words.length; n += 1) {
      const testLine = `${line + words[n]} `;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > x2 && n > 0) {
        ctx.fillText(line, x1, y1);
        line = `${words[n]} `;
        /* eslint-disable-next-line no-param-reassign */
        y1 += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x1, y1 + i * lineHeight);
  }
}

export function text(
  ctx: CanvasRenderingContext2D,
  { x1, y1, x2, drawFontsize, drawColor, text: t }: Props,
) {
  ctx.font = `${drawFontsize} sans-serif`;
  ctx.textBaseline = 'top';
  ctx.fillStyle = drawColor;
  wrapText(ctx, { x1: x1 + 3, y1: y1 + 4, x2, text: t });
}
