import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { get, update } from '../../utils/api';
import { apiUrl } from '../../constants/urls';
import { DraggableList } from '../draggable/DraggableList';

const HabitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0.5rem;
  align-items: center;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const ToggleButton = styled.button`
  background-color: ${p => (p.selected ? colors.brightGrey : colors.darkGrey)};
  color: ${colors.white};
  width: 50%;
  padding: 0.8rem 0;
  border: none;

  :hover {
    background-color: ${colors.brightGrey};
    cursor: pointer;
  }

  :active {
    background-color: ${p =>
      p.selected ? colors.brightGrey : colors.darkGrey};
  }
`;

export const Habits = ({ users, currentUser }) => {
  const [dbUpdate, setDbUpdate] = useState(true);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    get(`${apiUrl}/habits`, currentUser.username).then(habits => {
      setListOrder(habits);
    });
  }, [dbUpdate]);

  const onListUpdate = list => {
    console.log('TheList: ', list);
    list.forEach(h => {
      update(`${apiUrl}/habits/${h._id}`, h, currentUser.username);
    });
    setListOrder(list);
  };

  const habitList = listOrder.map(habit => {
    return (
      habit && {
        name: habit.title && habit.title.toLowerCase(),
        ...habit,
      }
    );
  });

  return (
    <HabitsWrapper>
      <ListContainer>
        {habitList.length > 0 && (
          <DraggableList
            listData={habitList}
            onListUpdate={onListUpdate}
            setListOrder={setListOrder}
            currentUser={currentUser}
          />
        )}
      </ListContainer>
      <ToggleButton onClick={() => onListUpdate(listOrder)}>
        Save order
      </ToggleButton>
    </HabitsWrapper>
  );
};
