import React, { useState, useEffect } from 'react';
import Draggable from './Draggable';
import { colors } from '../../constants/colors';
import { Habit } from '../habits/Habit';
import { prepend } from '../../utils/helpers';

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

export const DraggableList = ({
  listData,
  onListUpdate,
  currentUser,
  setListOrder,
}) => {
  const [list, setList] = useState(listData || ['hello']);
  const [translatePosition, setTranslatePosition] = useState({});
  const [, setOriginalPosition] = useState({});
  const [dropY, setDropY] = useState(0);
  const [currentDrop, setCurrentDrop] = useState(undefined);
  const [axis] = useState('Y');

  useEffect(() => {
    setList(listData);
  }, [listData]);

  const handleDragStart = (position, name) => {
    if (!position) return;
    setOriginalPosition({
      name,
      ...position,
    });
  };

  const onAddOccasion = name => {
    onListUpdate(
      list.map(l => {
        if (l.name === name) {
          return {
            ...l,
            occasions: prepend(new Date(), l.occasions),
          };
        } else {
          return l;
        }
      })
    );
  };

  const onDeleteHabit = id => {
    onListUpdate(
      list
        .filter(l => l._id !== id)
        .map((l, index) => ({ ...l, rank: index + 1 }))
    );
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
    const currentIndex = list.findIndex(t => t.name === position.name);
    const rankedList = list.map((t, i) => moveRank(list, t, i, currentIndex));
    setList(rankedList);
    setListOrder(rankedList);
  };

  useEffect(() => {
    if (currentDrop) {
      const currentDropList = list.map(t =>
        t.name === currentDrop.name ? currentDrop : t
      );
      setList(currentDropList);
      setListOrder(currentDropList);
    }
  }, [currentDrop]);
  const sortedTasks = list.sort(compare);

  return (
    <>
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
            <Habit
              habit={t}
              addOccasion={onAddOccasion}
              deleteHabit={onDeleteHabit}
              currentUser={currentUser}
            />
          </Draggable>
        ))}
    </>
  );
};

DraggableList.defaultProps = {
  listData: [],
  onListUpdate: () => {},
};
