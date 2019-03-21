import { Point } from '../../classes';

// Credit for these methods goes to
// https://github.com/flowhub/the-graph/blob/master/the-graph/the-graph-edge.js

const NODE_SIZE = 110;
const CURVE = 90;

export const makeSVGPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  let c1X, c1Y, c2X, c2Y;

  if (endX - 5 < startX) {
    const curveFactor = ((startX - endX) * CURVE) / 200;
    if (Math.abs(endY - startY) < NODE_SIZE / 2) {
      // Loopback
      c1X = startX + curveFactor;
      c1Y = startY - curveFactor;
      c2X = endX - curveFactor;
      c2Y = endY - curveFactor;
    } else {
      // Stick out some
      c1X = startX + curveFactor;
      c1Y = startY + (endY > startY ? curveFactor : -curveFactor);
      c2X = endX - curveFactor;
      c2Y = endY + (endY > startY ? -curveFactor : curveFactor);
    }
  } else {
    // Controls halfway between
    c1X = startX + (endX - startX) / 2;
    c1Y = startY;
    c2X = c1X;
    c2Y = endY;
  }

  const path = `M ${startX} ${startY} C ${c1X} ${c1Y} ${c2X} ${c2Y} ${endX} ${endY}`;

  return { path, c1X, c1Y, c2X, c2Y };
};

export const findPointOnCurve = function(
  p: number,
  sx: number,
  sy: number,
  c1x: number,
  c1y: number,
  c2x: number,
  c2y: number,
  ex: number,
  ey: number
) {
  // p is percentage from 0 to 1
  const op = 1 - p;
  // 3 green points between 4 points that define curve
  const g1x = sx * p + c1x * op;
  const g1y = sy * p + c1y * op;
  const g2x = c1x * p + c2x * op;
  const g2y = c1y * p + c2y * op;
  const g3x = c2x * p + ex * op;
  const g3y = c2y * p + ey * op;
  // 2 blue points between green points
  const b1x = g1x * p + g2x * op;
  const b1y = g1y * p + g2y * op;
  const b2x = g2x * p + g3x * op;
  const b2y = g2y * p + g3y * op;
  // Point on the curve between blue points
  const x = b1x * p + b2x * op;
  const y = b1y * p + b2y * op;

  return new Point(x, y);
};
