// @flow

export default function arrow(
  ctx: CanvasRenderingContext2D,
  { x, y, x2, color }: { x: number, y: number, x2: number, color: string },
) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, 4, 0, 2 * Math.PI, true);
  ctx.lineTo(x2, y);
  ctx.arc(x2 - 2, y, 4, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
}
