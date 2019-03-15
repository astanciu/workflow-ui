const NODE_SIZE = 100;
const CURVE = 50;

const makeSVGPath = (startX, startY, endX, endY) => {
  let c1X, c1Y, c2X, c2Y;

  if (endX - 5 < startX) {
    var curveFactor = ((startX - endX) * CURVE) / 200;
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
  const path = createEdgePathArray(
    startX,
    startY,
    c1X,
    c1Y,
    c2X,
    c2Y,
    endX,
    endY
  );

  return path.join(' ');
};

const createEdgePathArray = (
  sourceX,
  sourceY,
  c1X,
  c1Y,
  c2X,
  c2Y,
  targetX,
  targetY
) => {
  return ['M', sourceX, sourceY, 'C', c1X, c1Y, c2X, c2Y, targetX, targetY];
};

export default makeSVGPath;
