import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { create, get, update } from '../../utils/api';
import { apiUrl } from '../../constants/urls';
import { DraggableList } from '../draggable/DraggableList';
import { ResizableTextarea } from '../chat/ResizableTextarea';
import { scrollToBottom } from '../chat/ChatInput';
import { useKeyPress } from '../../hooks/useKeyPress';

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

const Button = styled.button`
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
  const [listOrder, setListOrder] = useState([]);
  const [doOnce, setDoOnce] = useState(false);
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(1);
  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    if (!currentUser) return;
    get(`${apiUrl}/habits`, currentUser.username).then(habits => {
      setListOrder(habits);
    });
  }, []);

  const onListUpdate = list => {
    console.log('TheList: ', list);
    list.forEach(h => {
      update(`${apiUrl}/habits/${h._id}`, h, currentUser.username);
    });
    setListOrder(list);
  };

  const onCreateHabit = h => {
    create(`${apiUrl}/habits`, h, currentUser.username).then(response => {
      console.log('Response: ', response);
      document.getElementById('HabitInput').focus();
      setTimeout(() => scrollToBottom(setValue, setRows), 200);
      setTimeout(() => setDoOnce(false), 1000);
    });
  };

  const habitList = listOrder.map(habit => {
    return (
      habit && {
        name: habit.title && habit.title.toLowerCase(),
        ...habit,
      }
    );
  });
  if (enterPress && !doOnce && value) {
    setDoOnce(true);
    onCreateHabit({
      title: value,
      description: 'Enter description here...',
      startDate: new Date(),
      endDate: new Date(),
      occasions: [],
      rank: listOrder.length + 1,
    });
  }
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
      <SaveOrderButton onClick={() => onListUpdate(listOrder)}>
        Save order
      </SaveOrderButton>
      <InputWrapper>
        <ResizableTextarea
          id="HabitInput"
          placeholder="New habit..."
          value={value}
          setValue={setValue}
          rows={rows}
          setRows={setRows}
        />
        <InputButton
          onClick={() => {
            setDoOnce(true);
            !doOnce &&
              onCreateHabit({
                title: value,
                description: 'Enter description here...',
                startDate: new Date(),
                endDate: new Date(),
                occasions: [],
                rank: listOrder.length + 1,
              });
            setTimeout(() => scrollToBottom(setValue, setRows), 200);
            setTimeout(() => setDoOnce(false), 1000);
          }}
        >
          &#x27A3;
        </InputButton>
      </InputWrapper>
    </HabitsWrapper>
  );
};

const InputWrapper = styled.div`
  background-color: ${colors.darkerGrey};
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SaveOrderButton = styled(Button)`
  margin-bottom: 5rem;
`;

const InputButton = styled.button`
  padding: 0.6rem 0.6rem;
  font-size: 1.5em;
  border: none;
  border-radius: 10rem;
  background-color: ${colors.white};
  color: ${colors.darkGrey};
`;
