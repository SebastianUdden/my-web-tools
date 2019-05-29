import React from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { DraggableList } from '../draggable/DraggableList';

const TASKS = [
  {
    name: 'Learn Angular',
    category: 'wip',
    bgcolor: 'yellow',
    rank: 1,
    position: { x: 0, y: 0 },
  },
  {
    name: 'React',
    category: 'wip',
    bgcolor: 'pink',
    rank: 2,
    position: { x: 0, y: 0 },
  },
  {
    name: 'Vue',
    category: 'complete',
    bgcolor: 'skyblue',
    rank: 3,
    position: { x: 0, y: 0 },
  },
  {
    name: 'Due',
    category: 'complete',
    bgcolor: 'skyblue',
    rank: 4,
    position: { x: 0, y: 0 },
  },
  {
    name: 'Mue',
    category: 'complete',
    bgcolor: 'skyblue',
    rank: 5,
    position: { x: 0, y: 0 },
  },
  {
    name: 'Rue',
    category: 'complete',
    bgcolor: 'skyblue',
    rank: 6,
    position: { x: 0, y: 0 },
  },
];

export const Lab = () => {
  return (
    <LabWrapper>
      {/* <h1>THE LAB</h1>
      <p>
        Original{axis}: {originalPosition[axis.toLowerCase()]}
      </p>
      <p>
        Translate{axis}: {translatePosition[axis.toLowerCase()]}
      </p> */}
      <h1>Test</h1>
      <DraggableList listData={TASKS} />
    </LabWrapper>
  );
};

const LabWrapper = styled.div`
  width: 90%;
  touch-action: pan-y;
  z-index: 10;
`;

const Square = styled.div`
  background-color: ${p => colors.darkishGrey};
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  z-index: 20;
`;
