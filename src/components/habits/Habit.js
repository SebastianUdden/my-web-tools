import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/colors';

export const Habit = ({
  name,
  description,
  occasions,
  orderedHabits,
  setOrderedHabits,
}) => {
  const [expandedView, setExpandedView] = useState(false);
  const [expandLatest, setExpandLatest] = useState([
    occasions[0].toLocaleDateString(),
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [draggedIdx, setDraggedIdx] = useState(null);

  const priority = orderedHabits
    .map((habit, index) => {
      if (!habit) return null;
      if (habit.name === name) {
        return index + 1;
      }
      return null;
    })
    .filter(prio => typeof prio === 'number')[0];

  const onDragStart = (e, index) => {
    setDraggedItem(orderedHabits[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 300, 20);
  };

  const onDragOver = index => {
    setDraggedOverItem(orderedHabits[index]);

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = orderedHabits.filter(item => item !== draggedItem);
    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);

    setOrderedHabits(items);
  };

  const onDragEnd = () => {
    setDraggedIdx(null);
  };

  return (
    <Container onDragOver={() => onDragOver(draggedIdx)}>
      <HabitWrapper onClick={() => setExpandedView(!expandedView)}>
        <Row>
          <Priority>{priority}</Priority>
          <TopInfo>
            <Name>{name}</Name>
            <div>
              <Add>&#x2b;</Add>
              {/* <Delete onClick={() => alert(`Deleting: ${name}`)}>&#x2715;</Delete> */}
            </div>
          </TopInfo>
        </Row>
        <UL expandedView={expandedView}>
          {expandLatest.length < 2 && (
            <Latest
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setExpandLatest(
                  occasions.map(
                    (occasion, index) =>
                      index < 10 && occasion.toLocaleDateString()
                  )
                );
              }}
            >
              {expandLatest}
            </Latest>
          )}
          {expandLatest &&
            expandLatest.length > 2 &&
            expandLatest.map(latest => (
              <Latest
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpandLatest([occasions[0].toLocaleDateString()]);
                }}
              >
                {latest}
              </Latest>
            ))}
        </UL>
        {expandedView && (
          <>
            <Description>{description}</Description>
          </>
        )}
      </HabitWrapper>
      <ReorderWrapper
        draggable
        onDragStart={e => onDragStart(e, priority - 1)}
        onDragEnd={onDragEnd}
      >
        <Arrow
          onClick={() =>
            setOrderedHabits(filterHabits(true, priority, orderedHabits))
          }
        >
          &#x21e7;
        </Arrow>
        <Arrow
          onClick={() =>
            setOrderedHabits(filterHabits(false, priority, orderedHabits))
          }
        >
          &#x21e9;
        </Arrow>
      </ReorderWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 0.5rem;
`;

const HabitWrapper = styled.div`
  padding: 1rem;
  background-color: ${colors.darkGrey};
  cursor: pointer;
`;

const ReorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const Description = styled.p``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 0.2rem;
  border-bottom: 1px solid white;
`;

const TopInfo = styled.div`
  min-width: 16rem;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Priority = styled.span`
  border: 1px solid ${colors.white};
  border-radius: 5rem;
  padding: 0.2rem 0.7rem;
  margin-right: 0.5rem;
  margin-top: -0.3rem;
  margin-bottom: 0.7rem;
`;

const Name = styled.label`
  color: ${colors.white};
  margin-right: 0.5rem;
`;
const Latest = styled.li`
  margin: 0;
  color: ${colors.brightGrey};
`;
const Add = styled.button`
  background-color: ${colors.brightGrey};
  padding: 0.2rem 0.8rem 0;
  border: none;
  color: ${colors.white};
  /* margin-right: 0.6rem; */
  border-radius: 0.2rem;
`;
// const Delete = styled.label``;

const Arrow = styled.button`
  background-color: ${colors.brightGrey};
  border: 1px solid red;
  padding: 0.5rem;
  height: 100%;
  border: none;
  color: ${colors.white};
  font-size: x-small;
`;

const UL = styled.ul`
  margin: ${p => (p.expandedView ? '1rem' : '0 1rem')};
`;

const filterHabits = (directionUp, priority, orderedHabits) => {
  const direction = directionUp ? 2 : 0;
  const sliced = orderedHabits.slice(priority - 1, priority)[0];
  const filtered = orderedHabits.filter(
    (habit, index) => (directionUp && index === 0) || index !== priority - 1
  );
  priority - direction >= 0 && filtered.splice(priority - direction, 0, sliced);
  return filtered;
};
