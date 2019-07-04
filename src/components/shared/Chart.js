import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { Button, FlexWrapper } from './commonComponents';

const linearRemap = (value, oldMin, oldMax, newMin, newMax) => {
  const newScale = newMax - newMin;
  const valueAsPct = (value - oldMin) / (oldMax - oldMin);
  const scaledValue = valueAsPct * newScale;
  const shiftedAndScaledValue = scaledValue + newMin;
  return shiftedAndScaledValue;
};

const precise = (x, n) => {
  return Number.parseFloat(x).toPrecision(n);
};

const maxHeight = 400;
const maxWidth = 400;
const widthIndentationLeft = 0.13;
const widthIndentationRight = 0.9;
const strokeWidth = 1;
const radius = 3;

const getX = (index, length) => {
  const shiftedAndScaled = linearRemap(
    index,
    0,
    length,
    maxWidth * widthIndentationLeft,
    maxWidth * widthIndentationRight
  );
  return shiftedAndScaled;
};

const getY = (position, high, low) => {
  const shiftedAndScaled = linearRemap(
    position,
    low,
    high,
    maxHeight * 0.1,
    maxHeight * widthIndentationRight
  );
  return maxHeight - shiftedAndScaled;
};

const Chart = ({ id, positions, selectedPoint, setSelectedPoint }) => {
  const values = positions.map(p => p.value);
  const times = positions.map(p => p.time);
  const positionsDescending = values.slice().sort((a, b) => b - a);
  const high = positionsDescending[0];
  const low = positionsDescending[positionsDescending.length - 1];
  const positionsXY = values.map(
    (p, i) => `${getX(i, positions.length - 1)},${getY(p, high, low)}`
  );

  const oneDown = point => (point > 0 ? point - 1 : 0);
  const oneUp = point =>
    point < positions.length - 1 ? point + 1 : positions.length - 1;
  const fiveDown = point => (point > 5 ? point - 5 : 0);
  const fiveUp = point =>
    point < positions.length - 5 ? point + 5 : positions.length - 1;
  const twentyDown = point => (point > 20 ? point - 20 : 0);
  const twentyUp = point =>
    point < positions.length - 20 ? point + 20 : positions.length - 1;

  const checkKey = e => {
    const event = e || window.event;
    if (event.keyCode === 38) {
      // up arrow
      e.stopPropagation();
      e.preventDefault();
      setSelectedPoint(fiveUp(selectedPoint));
    } else if (event.keyCode === 40) {
      // down arrow
      e.stopPropagation();
      e.preventDefault();
      setSelectedPoint(fiveDown(selectedPoint));
    } else if (event.keyCode === 37) {
      // left arrow
      setSelectedPoint(oneDown(selectedPoint));
    } else if (event.keyCode === 39) {
      // right arrow
      setSelectedPoint(oneUp(selectedPoint));
    }
  };

  useEffect(() => {
    document.onkeydown = checkKey;
  }, [selectedPoint]);

  return (
    <Wrapper>
      <FlexWrapper>
        <NavigateButton
          id="twenty-down"
          onClick={() => setSelectedPoint(twentyDown(selectedPoint))}
        >
          &#x3c;&#x3c;&#x3c;
        </NavigateButton>
        <NavigateButton
          id="five-down"
          onClick={() => setSelectedPoint(fiveDown(selectedPoint))}
        >
          &#x3c;&#x3c;
        </NavigateButton>
        <NavigateButton
          id="one-down"
          onClick={() => setSelectedPoint(oneDown(selectedPoint))}
        >
          &#x3c;
        </NavigateButton>
        <NavigateButton
          id="one-up"
          onClick={() => setSelectedPoint(oneUp(selectedPoint))}
        >
          &#x3e;
        </NavigateButton>
        <NavigateButton
          id="five-up"
          onClick={() => setSelectedPoint(fiveUp(selectedPoint))}
        >
          &#x3e;&#x3e;
        </NavigateButton>
        <NavigateButton
          id="twenty-up"
          onClick={() => setSelectedPoint(twentyUp(selectedPoint))}
        >
          &#x3e;&#x3e;&#x3e;
        </NavigateButton>
      </FlexWrapper>
      <SVG viewBox={`0 0 ${maxWidth} ${maxHeight}`}>
        <title id={`${id}-title`}>
          A line chart showing some information about {id}
        </title>
        <polyline
          fill="none"
          stroke={colors.orange}
          strokeWidth={strokeWidth}
          points={positionsXY}
        />
        <g>
          <Line
            x1={maxWidth * widthIndentationLeft}
            x2={maxWidth * 0.9}
            y1={maxHeight * 0.9}
            y2={maxHeight * 0.9}
          />
        </g>
        <g>
          <Line
            x1={maxWidth * widthIndentationLeft}
            x2={maxWidth * widthIndentationLeft}
            y1={maxHeight * 0.9}
            y2={maxHeight * 0.1}
          />
        </g>
        <g>
          {values.map(
            (p, i) =>
              selectedPoint === i && (
                <React.Fragment key={p}>
                  <Text
                    interactive
                    x={positionsXY[i].split(',')[0] - maxWidth * 0.04}
                    y={maxHeight * 0.05}
                  >
                    {p}
                  </Text>
                  <Line
                    interactive
                    x1={positionsXY[i].split(',')[0]}
                    x2={positionsXY[i].split(',')[0]}
                    y1={maxHeight * 0.94}
                    y2={maxHeight * 0.06}
                  />
                </React.Fragment>
              )
          )}
        </g>
        <g>
          {values.map(
            (p, i) =>
              (p === high || p === low) && (
                <Text key={p} x={0} y={positionsXY[i].split(',')[1]}>
                  {precise(Number(p), 6)}
                </Text>
              )
          )}
        </g>
        <g>
          {times.map(
            (t, i) =>
              selectedPoint === i && (
                <Text
                  key={t}
                  interactive
                  x={positionsXY[i].split(',')[0] - maxWidth * 0.1}
                  y={maxHeight * 0.98}
                >
                  {t}
                </Text>
              )
          )}
        </g>
        <g data-setname="Our first data set">
          {positions.map((p, i) => (
            <Circle
              key={`${p.value}-${p.time}`}
              interactive={i === selectedPoint}
              onClick={() => setSelectedPoint(i)}
              cx={positionsXY[i].split(',')[0]}
              cy={positionsXY[i].split(',')[1]}
              data-value={p.value}
              r={radius}
            />
          ))}
        </g>
      </SVG>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0.1rem;
`;

const SVG = styled.svg`
  fill: 1px solid ${colors.darkGrey};
`;

const Line = styled.line`
  stroke: ${p => (p.interactive ? colors.red : colors.darkWhite)};
  stroke-width: ${p => (p.interactive ? 0.5 : strokeWidth)};
`;

const Text = styled.text`
  font-size: x-small;
  fill: ${p => (p.interactive ? colors.red : colors.darkWhite)};
`;

const Circle = styled.circle`
  fill: ${p => (p.interactive ? colors.red : colors.orange)};
  :hover {
    fill: ${colors.red};
    cursor: pointer;
  }
  :focus {
    fill: red;
  }
`;

const NavigateButton = styled(Button)`
  touch-action: manipulation;
  width: 100%;
  margin-right: 0.1rem;
  padding: 0;
`;

export default Chart;
