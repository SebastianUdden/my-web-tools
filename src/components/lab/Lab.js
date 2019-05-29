import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/colors';
import Draggable from './Draggable';

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

const offset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

const compare = (a, b) => {
  if (a.rank < b.rank) {
    return -1;
  }
  if (a.rank > b.rank) {
    return 1;
  }
  return 0;
};

export const Lab = () => {
  const [tasks, setTasks] = useState({ wip: TASKS, complete: [] });
  const [translatePosition, setTranslatePosition] = useState({});
  const [originalPosition, setOriginalPosition] = useState({});
  const [dropY, setDropY] = useState(0);
  const [currentDrop, setCurrentDrop] = useState(undefined);
  const [axis] = useState('Y');

  const handleDragStart = (position, name) => {
    if (!position) return;
    setOriginalPosition({
      name,
      ...position,
    });
  };

  const handleDrag = (position, name) => {
    document.getElementById(name) &&
      setDropY(offset(document.getElementById(name)).top);
    setTranslatePosition({
      name,
      ...position,
    });
  };
  // index, currentIndex, amount
  const moveRank = (tasks, t, index, currentIndex) => {
    const elementY = offset(document.getElementById(t.name)).top;
    if (index > currentIndex) {
      if (elementY < dropY) {
        setCurrentDrop({ ...tasks[currentIndex], rank: t.rank });
        return { ...t, rank: t.rank - 1 };
      }
      return t;
    } else if (index < currentIndex) {
      if (elementY > dropY) {
        if (
          index - 1 < 0 ||
          dropY > offset(document.getElementById(tasks[index - 1].name)).top
        ) {
          setCurrentDrop({
            ...tasks[currentIndex],
            rank: t.rank,
            topValue: true,
          });
        }
        return { ...t, rank: t.rank + 1 };
      }
      return t;
    } else {
      console.log('Moved: ', t.name);
      return t;
    }
  };

  const handleDragEnd = position => {
    const currentIndex = tasks.wip.findIndex(t => t.name === position.name);
    setTasks({
      wip: tasks.wip.map((t, i) => moveRank(tasks.wip, t, i, currentIndex)),
      completed: [],
    });
  };

  useEffect(() => {
    currentDrop &&
      setTasks({
        wip: tasks.wip.map(t =>
          t.name === currentDrop.name ? currentDrop : t
        ),
        completed: [],
      });
  }, [currentDrop]);

  const sortedTasks = tasks.wip.sort(compare);
  return (
    <LabWrapper>
      <h1>THE LAB</h1>
      <p>
        Original{axis}: {originalPosition[axis.toLowerCase()]}
      </p>
      <p>
        Translate{axis}: {translatePosition[axis.toLowerCase()]}
      </p>
      {sortedTasks &&
        sortedTasks.map(t => (
          <Draggable
            key={t.name}
            onDragStart={position => handleDragStart(position, t.name)}
            onDrag={position => handleDrag(position, t.name)}
            onDragOver={e => e.preventDefault()}
            onDragEnd={() => handleDragEnd(translatePosition)}
            draggableStyle={{
              backgroundColor: colors.darkishGrey,
              margin: '1rem 0',
              padding: '1rem',
              width: '100%',
              zIndex: '20',
            }}
          >
            <div id={t.name}>
              {t.rank}: {t.name}{' '}
              {document.getElementById(t.name) &&
                offset(document.getElementById(t.name)).top}
            </div>
          </Draggable>
        ))}
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
